import React from "react";

function LeftLayout({ children }) {
  return (
    <div className="2xl:w-2/5 xl:w-5/12 lg:w-3/6 w-full flex items-center  p-2 bg-gray-200 dark:bg-gray-700  place-content-center flex-col ">
      {children}
    </div>
  );
}

function RightLayout({ children }) {
  return (
    <div className="2xl:w-1/4 xl:w-3/12 lg:w-2/6 w-full dashboard text-black dark:text-white   bg-gray-200 dark:bg-gray-700  flex flex-col justify-items-start items-start p-4 ">
      {children}
    </div>
  );
}

function Layout({ children }) {
  return (
    <>
      <div className="flex flex-row place-content-center gap-5 w-full flex-wrap md:flex-nowrap  min-h-screen bg-gray-300 p-2  dark:bg-gray-800 box-border text-white">
        {children}
      </div>
    </>
  );
}

Layout.LeftLayout = LeftLayout;
Layout.RightLayout = RightLayout;

export default Layout;
