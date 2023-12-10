import React from "react";
import { TailSpin } from "react-loader-spinner";

function PreLoader() {
  return (
    <>
      <div className="flex items-center min-h-screen place-content-center bg-gray-100/80 dark:bg-gray-900/80  absolute w-full z-10">
        {/* loader */}
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </>
  );
}

export default PreLoader;
