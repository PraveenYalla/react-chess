import React, { useState } from "react";
import { evaluations } from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  setStockfishLevel,
  setRestartModel,
  setGamePosition,
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
      <h2 className="mt-4">Difficulty</h2>
      <div className="w-full flex flex-row gap-1 mt-2 justify-center">
        {Object.entries(evaluations).map(([level, depth], i) => (
          <button
            key={i}
            className={`w-full py-2 rounded-md drop-shadow-[0_5px_0px_rgba(0,0,0,0.8)] shadow-gray-600 bg-gray-500 dark:bg-gray-800 hover:bg-gray-600 dark:hover:bg-gray-600 ${
              depth === stockfishLevel ? `bg-slate-800` : `bg-slate-600`
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

      <Modal open={restartModel}>
        <div className=" text-white rounded-xl w-auto p-10 bg-gray-950 flex items-center flex-wrap flex-col">
          <div className="my-4 text-xl px-4">
            <h3 className="">Do you want to change level and restart?</h3>
          </div>
          <div className="px-4 flex items-center align-middle gap-5 justify-center">
            <button
              onClick={() => {
                game.reset();
                console.log(level);
                dispatch(setStockfishLevel(level));
                dispatch(setGamePosition(game.fen()));
                dispatch(setRestartModel(false));
              }}
              className="bg-slate-800 w-24 drop-shadow-[0_5px_0px_rgba(225,225,225,0.4)] py-2 rounded-lg hover:bg-slate-500 transition-all"
            >
              Confirm
            </button>
            <button
              onClick={() => {
                dispatch(setRestartModel(false));
              }}
              // className="bg-slate-800 w-24 drop-shadow-[0_5px_0px_rgba(225,225,225,0.4)] py-2 rounded-lg hover:bg-slate-500 transition-all"
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
