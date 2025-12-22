import React, { useEffect, useState } from "react";

const Timer = () => {
  const [count, setCounter] = useState(0);
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    let ID;

    if (startCount) {
      ID = setInterval(() => {
        setCounter((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (ID) {
        clearInterval(ID);
      }
    };
  }, [startCount]); 

  // Function to handle Reset
  const handleReset = () => {
    setStartCount(false); // 1. Stop the timer
    setCounter(0);        // 2. Reset the number immediately
  };

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setStartCount(true)}>start</button>
      <button onClick={() => setStartCount(false)}>stop</button>
      
      {/* Just call the function directly */}
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default Timer;