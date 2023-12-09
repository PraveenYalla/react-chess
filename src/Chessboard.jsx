import { useState, useMemo, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import Engine from "/public/Engine";
import Evaluation from "./components/Evaluation.jsx";
import History from "./components/History.jsx";
import Modal from "./components/Modal.jsx";
import { GiRobotGolem } from "react-icons/gi";
import {
  setWelcomDiagOpen,
  setRestartModel,
  setStartGame,
  setStockfishLevel,
  setGamePosition,
  setGameObj,
} from "./reducers/ChessReducer.js";
import { useDispatch, useSelector } from "react-redux";
import ActionsPanel from "./components/ActionsPanel.jsx";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Avatar from "./components/Avatar.jsx";

function ChessBoard() {
  const dispatch = useDispatch();

  const {
    welcomDiagOpen,
    restartModel,
    startGame,
    stockfishLevel,
    gamePosition,
    game,
  } = useSelector((state) => state.chess);

  const engine = useMemo(() => new Engine(), []);
  const gameObj = useMemo(() => new Chess(), []);

  const [moveFrom, setMoveFrom] = useState("");
  const [moveTo, setMoveTo] = useState(null);
  const [optionSquares, setOptionSquares] = useState({});

  useEffect(() => {
    dispatch(setGameObj(gameObj));
    dispatch(setGamePosition(gameObj.fen()));
  }, []);

  function findBestMove() {
    engine.evaluatePosition(game.fen(), stockfishLevel);

    engine.onMessage(({ bestMove }) => {
      if (bestMove) {
        game.move(bestMove);
        dispatch(setGamePosition(gameObj.fen()));
        if (game.isGameOver() || game.isDraw()) {
          toast.error("Checkmate");
        }
      }
    });
  }

  function onDrop(sourceSquare, targetSquare, piece) {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: piece[1].toLowerCase() ?? "q",
    });
    dispatch(setGamePosition(gameObj.fen()));

    // illegal move
    if (move === null) return false;

    // exit if the game is over
    if (game.isGameOver() || game.isDraw()) {
      toast.error("Checkmate");
      return false;
    }

    findBestMove();

    return true;
  }

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

  function onSquareClick(square) {
    // setRightClickedSquares({});

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

      // setGamePosition(game);
      dispatch(setGamePosition(gameObj.fen()));

      setTimeout(findBestMove, 300);
      setMoveFrom("");
      setMoveTo(null);
      setOptionSquares({});
      return;
    }
  }

  return (
    <>
      <div className="flex flex-row place-content-center  w-full  min-h-screen bg-gray-200  dark:bg-gray-800 box-border text-white">
        <div className="w-2/5 flex items-start place-content-center flex-col p-4">
          <Avatar
            name="Computer"
            image={<GiRobotGolem className="w-full h-full" />}
          />
          <div className="w-full py-4">
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
          <Avatar name="Guest" image="" />
        </div>
        {startGame && <ActionsPanel game={game} />}
        <Modal open={welcomDiagOpen}>
          <div className=" text-white w-auto p-10 bg-gray-950 flex items-center flex-wrap">
            <div className="w-36 px-4 h-32">
              <GiRobotGolem className="w-full h-full" />
            </div>
            <div className="my-4 px-4 w-48">
              <p className="text-sm">Accept the challenge</p>
              <h3 className="text-5xl font-black">Let's play</h3>
            </div>
            <div className="w-48 px-4 flex items-center align-middle justify-center">
              <button
                onClick={() => {
                  dispatch(setStartGame(true));
                  dispatch(setWelcomDiagOpen(false));
                }}
                className="bg-slate-800 w-full h-16 drop-shadow-[0_5px_0px_rgba(225,225,225,0.4)] py-2 rounded-lg hover:bg-slate-500 transition-all"
              >
                Play
              </button>
            </div>
          </div>
        </Modal>
        <ToastContainer
          position="bottom-center"
          autoClose={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          theme="colored"
        />
      </div>
    </>
  );
}

export default ChessBoard;
