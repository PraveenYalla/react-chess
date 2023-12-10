import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setGamePosition,
  setResignModel,
  setUserWon,
} from "../reducers/ChessReducer.js";
import Modal from "./Modal.jsx";
import { useNavigate } from "react-router-dom";
import { GiRobotGolem } from "react-icons/gi";

function Actions() {
  const dispatch = useDispatch();
  const { game, resignModal, userWon } = useSelector((state) => state.chess);
  const navigate = useNavigate();
  return (
    <>
      <div className="pt-2">
        <h2>Actions</h2>
        <div className="w-full flex flex-row gap-1 justify-center items-center">
          <button
            className="w-full py-2 text-sm rounded-md drop-shadow-[0_5px_0px_rgba(0,0,0,0.8)] shadow-gray-600 bg-gray-500 dark:bg-gray-800 hover:bg-gray-600 dark:hover:bg-gray-600"
            onClick={() => {
              game.reset();
              dispatch(setGamePosition(game.fen()));
            }}
          >
            Rematch
          </button>
          <button
            className="w-full  py-2 text-sm  rounded-md drop-shadow-[0_5px_0px_rgba(0,0,0,0.8)] shadow-gray-600 bg-gray-500 dark:bg-gray-800 hover:bg-gray-600 dark:hover:bg-gray-600"
            onClick={() => {
              game.undo();
              game.undo();
              dispatch(setGamePosition(game.fen()));
            }}
          >
            Undo
          </button>
          <button
            className="w-full  py-2 text-sm  rounded-md bg-red-600 drop-shadow-[0_5px_0px_rgba(0,0,0,0.8)] dark:drop-shadow-[0_5px_0px_rgba(0,0,0,0.8)] shadow-red-600"
            onClick={() => dispatch(setResignModel(true))}
          >
            Resign
          </button>
        </div>
      </div>

      {/* Modal to show message on resign */}
      <Modal open={resignModal}>
        <div className=" text-black dark:text-white rounded-xl w-auto p-10 bg-gray-300 dark:bg-gray-950 flex items-center flex-wrap flex-col">
          <div className="my-4 text-xl px-4">
            {userWon ? (
              <>
                <p className="text-4xl mb-2">Congratulations...!</p>
                <h2>let's play again </h2>
              </>
            ) : (
              <>
                <div className="flex flex-col text-center gap-2">
                  <GiRobotGolem className="w-full h-28" />
                  <p className="text-4xl mb-2">I'm not here to win,</p>
                  <h2> Just to make sure you lose </h2>
                </div>
              </>
            )}
          </div>
          <div className="px-4 flex items-center align-middle gap-5 justify-center">
            <button
              onClick={() => {
                game.reset();
                dispatch(setGamePosition(game.fen()));
                dispatch(setResignModel(false));
                dispatch(setUserWon(false));
              }}
              className="w-full px-4 bg-yellow-600 border-dotted border-yellow-900 border-4 dark:bg-yellow-600 drop-shadow-[0_5px_0px_rgba(133,87,0,0.8)] py-2 rounded-lg  transition-all"
            >
              Rematch
            </button>
            <button
              onClick={() => {
                game.reset();
                dispatch(setGamePosition(game.fen()));
                dispatch(setResignModel(false));
                dispatch(setUserWon(false));
                navigate("/");
              }}
              className="w-full  py-3  px-4   rounded-md drop-shadow-[0_5px_0px_rgba(0,0,0,0.8)] shadow-gray-600 bg-gray-950 text-white
              dark:bg-gray-300 dark:text-black hover:bg-gray-900"
            >
              Dashboard
            </button>
            <button
              onClick={() => {
                dispatch(setResignModel(false));
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Actions;
