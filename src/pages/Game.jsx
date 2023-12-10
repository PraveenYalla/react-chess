import { useState, useMemo, useEffect } from "react";
import { Chess } from "chess.js";
import Engine from "/public/Engine";
import { GiRobotGolem } from "react-icons/gi";
import {
  setGamePosition,
  setGameObj,
  setEngineObj,
  setUserWon,
} from "../reducers/ChessReducer.js";
import { useDispatch } from "react-redux";
import ActionsPanel from "../components/ActionsPanel.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Avatar from "../components/Avatar.jsx";
import Board from "../components/Board.jsx";
import Layout from "../layout/Layout.jsx";
import PreLoader from "../components/PreLoader.jsx";
import ProfileBar from "../components/ProfileBar.jsx";

function Game() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  // Initialzing stockfish game engine and Chess.js
  const engine = useMemo(() => new Engine(), []);
  const gameObj = useMemo(() => new Chess(), []);

  useEffect(() => {
    // Actions to update game and engine states in redux store
    dispatch(setGameObj(gameObj));
    dispatch(setEngineObj(engine));
    dispatch(setGamePosition(gameObj.fen()));

    dispatch(setUserWon(false));

    // Preloader
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  return (
    <>
      {/* Preloader */}
      {loader && <PreLoader />}

      {/* Two Column layout */}
      <Layout>
        {/* Left Layout */}
        <Layout.LeftLayout>
          {/* Profile bar to show user details */}
          <ProfileBar>
            <Avatar
              name="Computer"
              image={<GiRobotGolem className="w-full h-full" />}
            />
          </ProfileBar>

          {/* Chessboard Component */}
          <Board />

          {/* Profile bar to show user details */}
          <ProfileBar>
            <Avatar name="Guest" image="" />
          </ProfileBar>
        </Layout.LeftLayout>

        {/* Right Layout */}
        <Layout.RightLayout>
          {/* Actions Panel */}
          <ActionsPanel />
        </Layout.RightLayout>
      </Layout>

      {/* Toast Snacbars */}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        draggable={false}
        theme="colored"
      />
    </>
  );
}

export default Game;
