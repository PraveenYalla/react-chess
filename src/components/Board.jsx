import { useState } from "react";
import { Chessboard } from "react-chessboard";
import {
  setGamePosition,
  setResignModel,
  setUserWon,
} from "../reducers/ChessReducer.js";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Board() {
  const dispatch = useDispatch();

  //   Get state form the redux store
  const { stockfishLevel, gamePosition, game, engine } = useSelector(
    (state) => state.chess
  );

  const [moveFrom, setMoveFrom] = useState("");
  const [moveTo, setMoveTo] = useState(null);
  const [optionSquares, setOptionSquares] = useState({});

  /********** function for stockfish engine moves *********/
  function findBestMove() {
    // update the level of difficulty
    engine.evaluatePosition(game.fen(), stockfishLevel);

    // on engine move
    engine.onMessage(({ bestMove }) => {
      if (bestMove) {
        game.move(bestMove);

        // update board with fen
        dispatch(setGamePosition(game.fen()));

        // if it is check
        if (game.isCheck()) {
          toast.warning("Computer: Its a check");
        }

        // if it is draw
        if (game.isDraw()) {
          toast.error("Its a draw");
          return false;
        }

        // if it is checkmate
        if (game.isGameOver() || game.isCheckmate()) {
          toast.error("Computer: Its a checkmate");

          // show modal on checkmate
          setTimeout(() => {
            dispatch(setResignModel(true));
          }, 6000);
          return false;
        }
      }
    });
  }

  /********** function for user moves *********/

  function onDrop(sourceSquare, targetSquare, piece) {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: piece[1].toLowerCase() ?? "q",
    });

    // update board with fen
    dispatch(setGamePosition(game.fen()));

    // illegal move
    if (move === null) return false;

    // if it is Check
    if (game.isCheck()) {
      toast.warning("Guest: Its a check");
    }

    // if it is Draw
    if (game.isDraw()) {
      toast.error("Its a draw");
      return false;
    }

    // if it is Checkmate
    if (game.isGameOver() || game.isCheckmate()) {
      toast.error("Guest: Its a Checkmate");

      // show modal on checkmate
      setTimeout(() => {
        dispatch(setResignModel(true));
        dispatch(setUserWon(true));
      }, 6000);
      return false;
    }

    // After user move call for engine move
    findBestMove();

    return true;
  }

  /********** function for getting options to move  *********/
  function getMoveOptions(square) {
    const moves = game.moves({
      square,
      verbose: true,
    });

    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }

    const newSquares = {};
    moves.map((move) => {
      newSquares[move.to] = {
        background:
          game.get(move.to) &&
          game.get(move.to).color !== game.get(square).color
            ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
            : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        borderRadius: "50%",
      };
      return move;
    });
    newSquares[square] = {
      background: "rgba(255, 255, 0, 0.4)",
    };
    setOptionSquares(newSquares);
    return true;
  }

  /********** function on clicking the square *********/
  function onSquareClick(square) {
    // from square
    if (!moveFrom) {
      const hasMoveOptions = getMoveOptions(square);
      if (hasMoveOptions) setMoveFrom(square);
      return;
    }

    // to square
    if (!moveTo) {
      // check if valid move before showing dialog
      const moves = game.moves({
        moveFrom,
        verbose: true,
      });
      const foundMove = moves.find(
        (m) => m.from === moveFrom && m.to === square
      );
      // not a valid move
      if (!foundMove) {
        // check if clicked on new piece
        const hasMoveOptions = getMoveOptions(square);
        // if new piece, setMoveFrom, otherwise clear moveFrom
        setMoveFrom(hasMoveOptions ? square : "");
        return;
      }

      // valid move
      setMoveTo(square);

      // is normal move
      const move = game.move({
        from: moveFrom,
        to: square,
        promotion: "q",
      });

      // if invalid, setMoveFrom and getMoveOptions
      if (move === null) {
        const hasMoveOptions = getMoveOptions(square);
        if (hasMoveOptions) setMoveFrom(square);
        return;
      }

      dispatch(setGamePosition(game.fen()));

      setTimeout(findBestMove, 300);
      setMoveFrom("");
      setMoveTo(null);
      setOptionSquares({});
      return;
    }
  }
  return (
    <div className="w-full py-4">
      {/* React Chessboard component */}
      <Chessboard
        id="PlayVsStockfish"
        position={gamePosition}
        onPieceDrop={onDrop}
        onSquareClick={onSquareClick}
        customSquareStyles={{
          ...optionSquares,
        }}
        customDarkSquareStyle={{
          backgroundColor: "#aaaaaa",
        }}
        customLightSquareStyle={{
          backgroundColor: "#eeeeee",
        }}
      />
    </div>
  );
}

export default Board;
