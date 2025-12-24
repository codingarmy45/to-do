import React, { useEffect, useState } from "react";

const Toggle = () => {
  // 1. Initialize state with a default value to handle the first visit
  // If localStorage is null, it falls back to "white"
  const [mode, setMode] = useState(localStorage.getItem("mode") || "white");

  // 2. Use useEffect to sync changes TO localStorage
  // This runs every time 'mode' changes
  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  const clickHandler = () => {
    // 3. Toggle state based on previous value
    setMode((prevMode) => (prevMode === "black" ? "white" : "black"));
  };

  return (
    <div
      style={{
        backgroundColor: mode,
        height: "100vh", // changed to 100vh for full screen
        width: "100%",   // changed to 100% to avoid horizontal scrollbars
        transition: "0.3s all", // Optional: adds a smooth transition
      }}
    >
      <button onClick={clickHandler}>
        Switch to {mode === "black" ? "Light" : "Dark"}
      </button>
    </div>
  );
};

export default Toggle;