import React from "react";
import { useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";

function History() {
  const { game } = useSelector((state) => state.chess);

  // Getting the history method from game object
  const history = Object.keys(game).length !== 0 && game.history();

  // Player1 moves
  const evens = history && history?.filter((h, i) => i % 2 == 0);

  // Player2 moves
  const odds = history && history?.filter((h, i) => i % 2 !== 0);

  return (
    <>
      <h2 className="mt-4">History</h2>
      <div className=" justify-start w-full sm:flex-1 h-56 align-middle overflow-auto mb-4  bg-white border-white border-8 dark:bg-gray-600 dark:border-gray-600 relative">
        <div className="w-full h-full absolute top-0 left-0">
          {evens.length > 0 && (
            <>
              {/* looping through moves array  */}
              {evens.map((h, i) => {
                return (
                  <div
                    key={i}
                    className="flex text-xs lg:text-sm justify-start gap-10 text-left w-full align-top flex-row p-1 mt-1 bg-gray-400/30 dark:bg-gray-900/30 "
                  >
                    {/* Showing moves in three column layout */}
                    {evens[i] !== undefined || odds[i] !== undefined ? (
                      <>
                        <div className="w-12">{i + 1}</div>
                        <div className="w-12">{evens[i]}</div>
                        <div className="w-12">
                          {odds[i] !== undefined ? (
                            odds[i]
                          ) : (
                            // loader
                            <ThreeDots
                              height="24"
                              width="24"
                              color="#4fa94d"
                              ariaLabel="three-dots-loading"
                              wrapperStyle={{}}
                              wrapperClass=""
                              visible={true}
                            />
                          )}
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default History;
