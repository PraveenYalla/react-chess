import React from "react";
import chess from "../assets/chess.png";
import { GiRobotGolem } from "react-icons/gi";
import ThemePanel from "../components/ThemePanel";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout.jsx";
import Header from "../components/Header.jsx";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <>
      {/* Two Column layout */}
      <Layout>
        {/* Left Layout */}
        <Layout.LeftLayout>
          <img src={chess} className="object-contain" />
        </Layout.LeftLayout>

        {/* Right Layout */}
        <Layout.RightLayout>
          <Header />

          <div className="flex-1 w-full h-full sm:relative">
            <GiRobotGolem className=" w-full h-full sm:absolute " />
          </div>
          <div className="my-6">
            <p className="text-2xl">Accept the challenge</p>
            <h3 className="text-5xl 2xl:text-7xl font-black">Let's play</h3>
          </div>

          <button
            onClick={() => {
              navigate("/game");
            }}
            className="w-full  text-2xl bg-yellow-600 border-dotted border-yellow-900 border-4 dark:bg-yellow-600 drop-shadow-[0_5px_0px_rgba(133,87,0,0.8)] py-2 rounded-lg  transition-all"
          >
            Play
          </button>

          {/* Theme panel for changing the modes  */}
          <ThemePanel />
        </Layout.RightLayout>
      </Layout>
    </>
  );
}

export default Dashboard;
