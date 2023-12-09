import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Evaluation from "./Evaluation.jsx";
import History from "./History.jsx";
import { setGamePosition, setResignModel } from "../reducers/ChessReducer.js";
import Modal from "./Modal.jsx";
import ThemePanel from "./ThemePanel.jsx";

function ActionsPanel() {
  const dispatch = useDispatch();
  const { game, resignModal } = useSelector((state) => state.chess);
  return (
    <>
      <div className="w-1/4 h-4/6 gap-2 mt-28 dashboard text-black dark:text-white bg-gray-300 dark:bg-gray-700  flex flex-col justify-items-start items-start p-4 ">
        <History />
        <Evaluation />
        <div className="w-full flex flex-row gap-1 justify-center items-center">
          <button
            className="w-full py-2 h-12 rounded-md bg-yellow-600  drop-shadow-[0_5px_0px_rgba(133,87,0,0.8)] dark:drop-shadow-[0_5px_0px_rgba(0,0,0,0.8)]   dark:bg-gray-800 hover:bg-yellow-500 dark:hover:bg-gray-600"
            onClick={() => {
              game.reset();
              dispatch(setGamePosition(game.fen()));
            }}
          >
            Rematch
          </button>
          <button
            className="w-full py-2 h-12 rounded-md bg-gray-500 dark:bg-gray-800 hover:bg-gray-600 dark:hover:bg-gray-600"
            onClick={() => {
              game.undo();
              game.undo();
              dispatch(setGamePosition(game.fen()));
            }}
          >
            Undo
          </button>
          <button
            className="w-full py-2 h-12 rounded-md bg-red-600 drop-shadow-[0_5px_0px_rgba(0,0,0,0.8)] dark:drop-shadow-[0_5px_0px_rgba(0,0,0,0.8)] shadow-red-600"
            onClick={() => dispatch(setResignModel(true))}
          >
            Resign
          </button>
        </div>
        <ThemePanel />
      </div>

      <Modal open={resignModal}>
        <div className=" text-white rounded-xl w-auto p-10 bg-gray-950 flex items-center flex-wrap flex-col">
          <div className="my-4 text-xl px-4">
            <h3 className="">I won you lost</h3>
          </div>
          <div className="px-4 flex items-center align-middle gap-5 justify-center">
            <button
              onClick={() => {
                game.reset();
                dispatch(setGamePosition(game.fen()));
                dispatch(setResignModel(false));
              }}
              className="bg-slate-800 w-24 drop-shadow-[0_5px_0px_rgba(225,225,225,0.4)] py-2 rounded-lg hover:bg-slate-500 transition-all"
            >
              Rematch
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ActionsPanel;
