import React, { useState, useEffect } from "react";
import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyInput from "@components/MyInput";
import CodeOutput from "@components/CodeOutput";

const MathEvaluator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    if (!expression.trim()) {
      setResult("");
      return;
    }

    const sanitized = expression.replace(/[^0-9+\-*/().%\s]/g, "");
    
    if (sanitized !== expression) {
        setResult("Error: Invalid characters in expression");
        return;
    }

    try {
      // eslint-disable-next-line no-new-func
      const calcResult = new Function(`"use strict"; return (${sanitized})`)();
      
      if (typeof calcResult === 'number' && !isNaN(calcResult)) {
        const formattedResult = Math.round(calcResult * 1e10) / 1e10;
        setResult(String(formattedResult));
      } else {
        setResult("Invalid format");
      }
    } catch (error) {
      setResult("Error: Malformed expression");
    }
  }, [expression]);

  return (
    <TwoColumn leftWidth="40">
      <TwoColumn.Left>
        <MyCard.Header
          title="Input"
          helper="Enter a mathematical expression."
        />

        <MyInput
          label="Expression"
          type="text"
          placeholder="e.g. (10 + 5) * 2 / 3"
          value={expression}
          onChange={setExpression}
        />
      </TwoColumn.Left>
      
      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="Result of the expression." />
        <CodeOutput output={result || "No result yet"} />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

MathEvaluator.title = "Math Evaluator";
export default MathEvaluator;
