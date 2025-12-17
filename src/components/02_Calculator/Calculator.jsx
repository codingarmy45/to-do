import React, { useState } from "react";

const Calculator = () => {
  const [calcState, setCalcState] = useState({
    current: "",
    previous: "",
    operator: "",
  });

  // Helper function to perform the math
  const calculate = (prev, curr, operator) => {
    const p = parseFloat(prev);
    const c = parseFloat(curr);
    if (isNaN(p) || isNaN(c)) return "";

    let computation = 0;
    switch (operator) {
      case "+":
        computation = p + c;
        break;
      case "-":
        computation = p - c;
        break;
      case "x":
        computation = p * c;
        break;
      case "/":
        computation = c === 0 ? "Error" : p / c;
        break;
      case "%":
        computation = p % c;
        break;
      default:
        return "";
    }
    return computation.toString();
  };

  const appendNumber = (num) => {
    // Prevent multiple decimals
    if (num === "." && calcState.current.includes(".")) return;
    
    setCalcState((prev) => ({
      ...prev,
      current: prev.current + num,
    }));
  };

  const operatorHandler = (ope) => {
    if (calcState.current === "") return;
    
    // If we already have a previous number, calculate the intermediate result first
    // (e.g., User types "5 + 5 +" -> immediately calculates 10)
    if (calcState.previous !== "") {
        const newPrevious = calculate(calcState.previous, calcState.current, calcState.operator);
        setCalcState({
            previous: newPrevious,
            current: "",
            operator: ope
        });
    } else {
        // Standard first step (User types "5 +")
        setCalcState((prev) => ({
            previous: prev.current,
            operator: ope,
            current: "",
        }));
    }
  };

  const solution = () => {
    if (!calcState.previous || !calcState.current) return;
    
    const result = calculate(calcState.previous, calcState.current, calcState.operator);
    
    // Set the result as current, clear previous/operator so user can continue calculating
    setCalcState({
      current: result,
      previous: "",
      operator: "",
    });
  };

  const resetHandler = () => {
    setCalcState({
      current: "",
      previous: "",
      operator: "",
    });
  };

  // Helper to delete last character (optional but useful)
  const deleteHandler = () => {
      setCalcState(prev => ({
          ...prev,
          current: prev.current.slice(0, -1)
      }))
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      {/* Display Logic: Show Previous + Operator + Current */}
      <div style={{ minHeight: "40px", fontSize: "24px", marginBottom: "10px", border: "1px solid #ccc", padding: "10px" }}>
        {calcState.previous} {calcState.operator} {calcState.current}
      </div>

      <div className="buttons-grid">
        <div>
          <button onClick={() => appendNumber("7")}>7</button>
          <button onClick={() => appendNumber("8")}>8</button>
          <button onClick={() => appendNumber("9")}>9</button>
          <button onClick={() => operatorHandler("+")}>+</button>
        </div>
        <div>
          <button onClick={() => appendNumber("4")}>4</button>
          <button onClick={() => appendNumber("5")}>5</button>
          <button onClick={() => appendNumber("6")}>6</button>
          <button onClick={() => operatorHandler("-")}>-</button>
        </div>
        <div>
          <button onClick={() => appendNumber("1")}>1</button>
          <button onClick={() => appendNumber("2")}>2</button>
          <button onClick={() => appendNumber("3")}>3</button>
          <button onClick={() => operatorHandler("x")}>x</button>
          <button onClick={() => operatorHandler("%")}>%</button>
        </div>
        <div>
          {/* FIXED: Passed "0" instead of "3" */}
          <button onClick={() => appendNumber("0")}>0</button> 
          <button onClick={() => appendNumber(".")}>.</button>
          <button onClick={() => operatorHandler("/")}>/</button>
          <button onClick={solution}>=</button>
          <button onClick={resetHandler}>C</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
