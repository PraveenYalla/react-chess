import React from "react";
import { useSelector } from "react-redux";
import { ThreeDots } from "react-loader-spinner";

function History() {
  const { game } = useSelector((state) => state.chess);
  const history = game.history();

  const odds = history?.filter((h, i) => i % 2 !== 0);
  const evens = history?.filter((h, i) => i % 2 == 0);

  return (
    <>
      <h2 className="mt-4">History</h2>
      <div className="flex justify-start w-full align-middle flex-col mb-4 h-60 overflow-auto">
        {evens.length > 0 && (
          <>
            {evens.map((h, i) => {
              return (
                <div
                  key={i}
                  className="flex justify-start gap-10 text-left w-full align-top flex-row p-1 mt-1 bg-gray-400/30 dark:bg-gray-900/30 "
                >
                  {evens[i] !== undefined || odds[i] !== undefined ? (
                    <>
                      <div className="w-12">{i + 1}</div>
                      <div className="w-12">{evens[i]}</div>
                      <div className="w-12">
                        {odds[i] !== undefined ? (
                          odds[i]
                        ) : (
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
    </>
  );
}

export default History;
