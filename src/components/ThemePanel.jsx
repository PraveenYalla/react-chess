import React, { useEffect, useState } from "react";

function ThemePanel() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <h2>Theme</h2>
      <div className="flex gap-1 w-full">
        <button
          onClick={() => setDarkMode(false)}
          className="w-full py-2 h-16 bg-slate-800 hover:bg-slate-600"
        >
          Light
        </button>
        <button
          onClick={() => setDarkMode(true)}
          className="w-full py-2 h-16 bg-slate-800 hover:bg-slate-600"
        >
          Dark
        </button>
      </div>
    </>
  );
}

export default ThemePanel;
