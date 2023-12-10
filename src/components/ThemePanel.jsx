import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../reducers/ChessReducer";
function ThemePanel() {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.chess);
  return (
    <>
      <div className=" w-full pt-2">
        <h2>Theme</h2>
        <div className="flex gap-1 w-full">
          <button
            onClick={() =>
              // Updating the darkmode state in redux store
              dispatch(setDarkMode(!darkMode))
            }
            className="w-full rounded-md py-2 h-12 drop-shadow-[0_5px_0px_rgba(0,0,0,0.8)] shadow-gray-600 bg-gray-950 text-white
           dark:bg-gray-300 dark:text-black hover:bg-gray-900"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </>
  );
}

export default ThemePanel;
