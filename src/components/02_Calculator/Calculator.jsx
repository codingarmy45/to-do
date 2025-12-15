import React, { useState } from "react";

const Calculator = () => {
  const [calcState, setCalcState] = useState({
    current: "",
    previous: "",
    operator: "",
  });
  const [sol, setSol] = useState(0);
  const [isequal, setIsequal] = useState(false);

  const operatorHandler = (ope) => {
    setIsequal(false)
    if (!calcState.previous) {
      setCalcState((prev) => ({
        ...prev,
        previous: prev.current,
        operator: ope,
        current: "",
      }));
    }
    else{
      setCalcState(()=>({
        previous:sol,
        operator:ope,
        current:""
      }))
    }
  };

  const solution = () => {
    setIsequal(true);
    if (calcState.operator == "+") {
      setSol(Number(calcState.previous) + Number(calcState.current));
    }
    else if (calcState.operator == "-") {
      setSol(Number(calcState.previous) - Number(calcState.current));
    }
    else if (calcState.operator == "x") {
      setSol(Number(calcState.previous) * Number(calcState.current));
    }
    else if (calcState.operator == "/") {
      setSol(Number(calcState.previous) / Number(calcState.current));
    }
    else if (calcState.operator == "%") {
      setSol(Number(calcState.previous) % Number(calcState.current));
    }
  };
  const resetHandler = () => {
    setSol(0);
    setCalcState(() => ({
      current: "",
      previous: "",
      operator: "",
    }));
    setIsequal(false);
  };
  return (
    <div>
    
      {isequal ? <h2>{sol}</h2> : <h2>{calcState.previous + calcState.operator + calcState.current}</h2>}
      <div>
        <button onClick={() =>setCalcState((prev) => ({ ...prev, current: prev.current + "7" }))}>7</button>
        <button onClick={() =>setCalcState((prev) => ({ ...prev, current: prev.current + "8" }))}>8</button>
        <button onClick={() =>setCalcState((prev) => ({ ...prev, current: prev.current + "9" }))}>9</button>
        <button onClick={() => operatorHandler("+")}>+</button>
      </div>
      <div>
        <button onClick={() =>setCalcState((prev) => ({ ...prev, current: prev.current + "4" }))}>4</button>
        <button onClick={() =>setCalcState((prev) => ({ ...prev, current: prev.current + "5" }))}>5</button>
        <button onClick={() =>setCalcState((prev) => ({ ...prev, current: prev.current + "6" }))}>6</button>
        <button onClick={() => operatorHandler("-")}>-</button>
      </div>
      <div>
        <button onClick={() =>setCalcState((prev) => ({ ...prev, current: prev.current + "1" }))}>1</button>
        <button onClick={() =>setCalcState((prev) => ({ ...prev, current: prev.current + "2" }))}>2</button>
        <button onClick={() =>setCalcState((prev) => ({ ...prev, current: prev.current + "3" }))}>3</button>
        <button onClick={() => operatorHandler("x")}>x</button>
        <button onClick={() => operatorHandler("%")}>%</button>
      </div>
      <div> 
        <button onClick={() =>setCalcState((prev) => ({ ...prev, current: prev.current + "3" }))}>0</button>
        <button onClick={() => operatorHandler("/")}>/</button>
        <button onClick={solution}>=</button>
        <button onClick={resetHandler}>reset</button>
      </div>
    </div>
  );
};

export default Calculator;
