import React from "react";

function ProfileBar({ children }) {
  return (
    <>
      <div className="w-full h-full text-black dark:text-white  bg-gray-300 dark:bg-gray-800 px-2 flex items-center">
        {children}
      </div>
    </>
  );
}

export default ProfileBar;
