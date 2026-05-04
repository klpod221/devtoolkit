import React, { useState, useEffect } from "react";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";

const SimpleCalculator = () => {
  const [currentValue, setCurrentValue] = useState("0");
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleNum = (num) => {
    if (waitingForNewValue) {
      setCurrentValue(String(num));
      setWaitingForNewValue(false);
    } else {
      setCurrentValue(currentValue === "0" ? String(num) : currentValue + num);
    }
  };

  const handleDot = () => {
    if (waitingForNewValue) {
      setCurrentValue("0.");
      setWaitingForNewValue(false);
      return;
    }
    if (!currentValue.includes(".")) {
      setCurrentValue(currentValue + ".");
    }
  };

  const handleOp = (op) => {
    if (operator && !waitingForNewValue) {
      calculate();
    } else {
      setPrevValue(currentValue);
    }
    setOperator(op);
    setWaitingForNewValue(true);
  };

  const calculate = () => {
    if (!operator || prevValue === null) return;
    const prev = parseFloat(prevValue);
    const current = parseFloat(currentValue);
    let result = 0;
    switch (operator) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "*":
        result = prev * current;
        break;
      case "/":
        result = current === 0 ? "Error" : prev / current;
        break;
      default:
        return;
    }
    
    // Round to avoid floating point precision issues (e.g. 0.1 + 0.2)
    if (result !== "Error") {
       result = Math.round(result * 1e10) / 1e10;
    }
    
    setCurrentValue(String(result));
    setPrevValue(String(result)); // Store result as prevValue for chained operations
    setOperator(null);
    setWaitingForNewValue(true);
  };

  const handleClear = () => {
    setCurrentValue("0");
    setPrevValue(null);
    setOperator(null);
    setWaitingForNewValue(false);
  };

  const handleSign = () => {
    setCurrentValue(String(parseFloat(currentValue) * -1));
  };

  const handlePercentage = () => {
    setCurrentValue(String(parseFloat(currentValue) / 100));
  };
  
  // Handle Keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      if (/[0-9]/.test(key)) handleNum(key);
      if (key === ".") handleDot();
      if (key === "+" || key === "-" || key === "*" || key === "/") handleOp(key);
      if (key === "Enter" || key === "=") {
          e.preventDefault(); // Prevent triggering focused button
          calculate();
      }
      if (key === "Escape" || key === "Backspace") handleClear(); // Simplified backspace to clear for now
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentValue, prevValue, operator, waitingForNewValue]);

  return (
    <div className="flex justify-center items-center py-10">
      <MyCard className="w-full max-w-sm">
        <div className="mb-6">
          <div className="text-right text-gray-500 dark:text-gray-400 h-6 text-sm overflow-hidden">
            {prevValue !== null ? `${prevValue} ${operator || ""}` : ""}
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-900 text-right text-4xl p-4 rounded-lg font-mono overflow-x-auto text-gray-800 dark:text-gray-100 break-all">
            {currentValue}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <MyButton color="light" onClick={handleClear} className="font-bold">
            AC
          </MyButton>
          <MyButton color="light" onClick={handleSign} className="font-bold">
            +/-
          </MyButton>
          <MyButton color="light" onClick={handlePercentage} className="font-bold">
            %
          </MyButton>
          <MyButton color="warning" onClick={() => handleOp("/")} className="font-bold text-xl">
            ÷
          </MyButton>

          <MyButton onClick={() => handleNum("7")} className="font-bold text-lg">7</MyButton>
          <MyButton onClick={() => handleNum("8")} className="font-bold text-lg">8</MyButton>
          <MyButton onClick={() => handleNum("9")} className="font-bold text-lg">9</MyButton>
          <MyButton color="warning" onClick={() => handleOp("*")} className="font-bold text-xl">
            ×
          </MyButton>

          <MyButton onClick={() => handleNum("4")} className="font-bold text-lg">4</MyButton>
          <MyButton onClick={() => handleNum("5")} className="font-bold text-lg">5</MyButton>
          <MyButton onClick={() => handleNum("6")} className="font-bold text-lg">6</MyButton>
          <MyButton color="warning" onClick={() => handleOp("-")} className="font-bold text-xl">
            -
          </MyButton>

          <MyButton onClick={() => handleNum("1")} className="font-bold text-lg">1</MyButton>
          <MyButton onClick={() => handleNum("2")} className="font-bold text-lg">2</MyButton>
          <MyButton onClick={() => handleNum("3")} className="font-bold text-lg">3</MyButton>
          <MyButton color="warning" onClick={() => handleOp("+")} className="font-bold text-xl">
            +
          </MyButton>

          <MyButton onClick={() => handleNum("0")} className="col-span-2 font-bold text-lg">
            0
          </MyButton>
          <MyButton onClick={handleDot} className="font-bold text-lg">.</MyButton>
          <MyButton color="success" onClick={calculate} className="font-bold text-xl">
            =
          </MyButton>
        </div>
      </MyCard>
    </div>
  );
};

SimpleCalculator.title = "Simple Calculator";
export default SimpleCalculator;
