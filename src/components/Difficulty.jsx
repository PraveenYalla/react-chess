import React, { useState } from "react";
import { difficulties } from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  setStockfishLevel,
  setRestartModel,
  setGamePosition,
  setUserWon,
} from "../reducers/ChessReducer";
import Modal from "./Modal";

function Evaluation() {
  const dispatch = useDispatch();
  const { stockfishLevel, game, restartModel } = useSelector(
    (state) => state.chess
  );

  const [level, setLevel] = useState(stockfishLevel);

  return (
    <>
      <div className="pt-2">
        <h2>Difficulty</h2>
        <div className="w-full flex flex-row gap-1 justify-center">
          {/* Get difficulties object from contacts and loop */}
          {Object.entries(difficulties).map(([level, depth], i) => (
            <button
              key={i}
              className={`w-full  py-2 text-sm rounded-md drop-shadow-[0_5px_0px_rgba(0,0,0,0.8)] shadow-gray-600 bg-gray-500 dark:bg-gray-800 hover:bg-gray-600  ${
                depth === stockfishLevel
                  ? ` bg-yellow-600  dark:bg-yellow-600 hover:bg-yellow-500 dark:hover:bg-yellow-500 drop-shadow-[0_5px_0px_rgba(133,87,0,0.8)]`
                  : `bg-slate-600`
              }`}
              onClick={() => {
                setLevel(depth);
                dispatch(setRestartModel(true));
              }}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Modal to show confirmation of updating the difficulty */}

      <Modal open={restartModel}>
        <div className=" w-96 rounded-xl p-10 bg-gray-300 text-black dark:text-white dark:bg-gray-900 flex items-center flex-wrap flex-col">
          <h3 className="text-2xl mb-4">
            Do you want to change the difficulty level and restart?
          </h3>
          <div className="px-4 flex items-center align-middle gap-5 justify-center">
            <button
              onClick={() => {
                // reset game
                game.reset();
                // updating the difficulty level in redux store
                dispatch(setStockfishLevel(level));

                dispatch(setGamePosition(game.fen()));
                dispatch(setRestartModel(false));
                dispatch(setUserWon(false));
              }}
              className="bg-yellow-600 w-24 drop-shadow-[0_5px_0px_rgba(133,87,0,0.8)]  py-2 rounded-lg hover:bg-yellow-500 transition-all"
            >
              Confirm
            </button>
            <button
              onClick={() => {
                dispatch(setRestartModel(false));
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

export default Evaluation;
