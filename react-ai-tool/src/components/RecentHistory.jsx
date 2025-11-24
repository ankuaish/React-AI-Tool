import React from "react";

const RecentHistory = ({
  setRecentHistory,
  recentHistory,
  setSelectedHistory,
}) => {
  const clearHistory = () => {
    localStorage.clear();
    setRecentHistory([]);
  };
  const clearSelectedHistory = (selectedItem) => {
    let history = JSON.parse(localStorage.getItem("history"));
    history = history.filter((item) => {
      if (item != selectedItem) {
        return item;
      }
    });
    setRecentHistory(history);
    localStorage.setItem("history", JSON.stringify(history));
  };

  return (
    <>
      {" "}
      <div className="md:col-span-1 col-span-2 dark:bg-zinc-800 bg-red-100 pt-3 h-screen">
        <h1 className="md:text-xl text-lg dark:text-white  text-black flex justify-center">
          <span>Recent Search</span>
          <button
            className="pt-1 pl-2 pr-2 pb-1 hover:bg-zinc-400"
            onClick={clearHistory}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              className="fill-black dark:fill-[#e3e3e3]"
            >
              <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
            </svg>
          </button>
        </h1>

        <ul className="text-left overflow-auto pt-2.5">
          {recentHistory &&
            recentHistory.map((item, index) => (
              <div className="flex justify-between pr-3">
                <li
                  onClick={() => setSelectedHistory(item)}
                  key={index}
                  className="w-full p-1 pl-5 truncate dark:text-zinc-400 text-zinc-700 cursor-pointer dark:hover:bg-zinc-700 hover:bg-red-200 dark:hover:text-zinc-200 hover:text-zinc-800"
                >
                  {item}
                </li>
                <button
                  className="p-1 hover:bg-zinc-400"
                  onClick={() => clearSelectedHistory(item)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="20px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    className="fill-black dark:fill-[#e3e3e3]"
                  >
                    <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
                  </svg>
                </button>
              </div>
            ))}
        </ul>
      </div>
    </>
  );
};

export default RecentHistory;
