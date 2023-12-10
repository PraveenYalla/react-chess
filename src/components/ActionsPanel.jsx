import React from "react";
import Difficulty from "./Difficulty.jsx";
import History from "./History.jsx";
import ThemePanel from "./ThemePanel.jsx";
import Actions from "./Actions.jsx";
import Header from "./Header.jsx";

function ActionsPanel() {
  return (
    <>
      <div className="flex w-full h-full flex-col gap-4">
        {/* Header */}
        <Header />

        {/* History component to show the sequence of moves */}
        <History />
        {/* Actons panel */}
        <Actions />
        {/* Difficulty component to change the level of difficulty */}
        <Difficulty />

        {/* Theme panel for changing the modes  */}
        <ThemePanel />
      </div>
    </>
  );
}

export default ActionsPanel;
