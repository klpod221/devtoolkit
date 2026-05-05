import React, { useState } from "react";
import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyTextarea from "@components/MyTextarea";
import MySelect from "@components/MySelect";
import MyButton from "@components/MyButton";
import CodeOutput from "@components/CodeOutput";

const parseMatrix = (str) => {
  if (!str.trim()) return null;
  return str.trim().split('\n').map(row => row.trim().split(/[\s,]+/).map(Number));
};
const formatMatrix = (m) => {
  return m.map(row => row.join('\t')).join('\n');
};

const MatrixCalculator = () => {
  const [matrixA, setMatrixA] = useState("1 2\n3 4");
  const [matrixB, setMatrixB] = useState("5 6\n7 8");
  const [operation, setOperation] = useState("add");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleCalculate = () => {
    setError("");
    setOutput("");
    try {
      const A = parseMatrix(matrixA);
      const B = parseMatrix(matrixB);

      if (!A && operation !== "transposeB") throw new Error("Matrix A is empty");
      if (!B && operation !== "transposeA") throw new Error("Matrix B is empty");

      // Validate rectangular shape
      if (A && A.some(row => row.length !== A[0].length)) throw new Error("Matrix A is not a valid rectangle");
      if (B && B.some(row => row.length !== B[0].length)) throw new Error("Matrix B is not a valid rectangle");

      let res;
      if (operation === "add") {
        if (A.length !== B.length || A[0].length !== B[0].length) throw new Error("Matrices must have the same dimensions");
        res = A.map((row, i) => row.map((val, j) => val + B[i][j]));
      } else if (operation === "sub") {
        if (A.length !== B.length || A[0].length !== B[0].length) throw new Error("Matrices must have the same dimensions");
        res = A.map((row, i) => row.map((val, j) => val - B[i][j]));
      } else if (operation === "mul") {
        if (A[0].length !== B.length) throw new Error("Number of columns in A must equal number of rows in B");
        res = Array(A.length).fill(0).map(() => Array(B[0].length).fill(0));
        for (let i = 0; i < A.length; i++) {
          for (let j = 0; j < B[0].length; j++) {
            for (let k = 0; k < A[0].length; k++) {
              if (isNaN(A[i][k]) || isNaN(B[k][j])) throw new Error("Invalid number detected in matrices");
              res[i][j] += A[i][k] * B[k][j];
            }
          }
        }
      } else if (operation === "transposeA") {
        res = A[0].map((_, colIndex) => A.map(row => row[colIndex]));
      } else if (operation === "transposeB") {
        res = B[0].map((_, colIndex) => B.map(row => row[colIndex]));
      }

      setOutput(formatMatrix(res));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Matrix Calculator" helper="Perform matrix addition, subtraction, multiplication, etc." />
        <div className="space-y-4 mt-4">
          <MyTextarea
            label="Matrix A (space or comma separated rows)"
            value={matrixA}
            onChange={(val) => setMatrixA(val)}
            placeholder="1 2\n3 4"
            rows={4}
          />
          <MySelect
            label="Operation"
            value={operation}
            onChange={(val) => setOperation(val)}
          >
            <option value="add">A + B</option>
            <option value="sub">A - B</option>
            <option value="mul">A * B</option>
            <option value="transposeA">Transpose A</option>
            <option value="transposeB">Transpose B</option>
          </MySelect>
          <MyTextarea
            label="Matrix B (space or comma separated rows)"
            value={matrixB}
            onChange={(val) => setMatrixB(val)}
            placeholder="5 6\n7 8"
            rows={4}
            disabled={operation === "transposeA"}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <MyButton onClick={handleCalculate} className="w-full">
            Calculate
          </MyButton>
        </div>
      </TwoColumn.Left>

      <TwoColumn.Right>
        <MyCard.Header title="Result" helper="Calculated matrix output" />
        <CodeOutput output={output} language="text" />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

MatrixCalculator.title = "Matrix Calculator";
export default MatrixCalculator;
