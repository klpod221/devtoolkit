import React, { useState } from "react";
import MyCard from "@components/MyCard";
import MyInput from "@components/MyInput";
import MyCopyButton from "@components/MyCopyButton";

const PercentageCalculator = () => {
  const [x1, setX1] = useState("50");
  const [y1, setY1] = useState("100");
  
  const [x2, setX2] = useState("50");
  const [y2, setY2] = useState("100");

  const [x3, setX3] = useState("50");
  const [y3, setX3_2] = useState("100");

  const calculateMode1 = () => {
    if (!x1 || !y1) return "";
    return ((parseFloat(x1) / 100) * parseFloat(y1)).toFixed(2).replace(/\.00$/, "");
  };

  const calculateMode2 = () => {
    if (!x2 || !y2 || parseFloat(y2) === 0) return "";
    return ((parseFloat(x2) / parseFloat(y2)) * 100).toFixed(2).replace(/\.00$/, "") + "%";
  };

  const calculateMode3 = () => {
    if (!x3 || !y3 || parseFloat(x3) === 0) return "";
    const x = parseFloat(x3);
    const y = parseFloat(y3);
    const diff = y - x;
    const percent = ((diff / Math.abs(x)) * 100).toFixed(2).replace(/\.00$/, "");
    if (diff > 0) return `+${percent}% (Increase)`;
    if (diff < 0) return `${percent}% (Decrease)`;
    return "0% (No change)";
  };

  return (
    <div className="flex flex-col gap-2 items-center w-full">
      <MyCard className="w-full max-w-4xl">
        <MyCard.Header
          title="Percentage of a Number"
          helper="What is X% of Y?"
        />

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 items-center">
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 whitespace-nowrap">What is</span>
            <MyInput type="number" placeholder="X" value={x1} onChange={setX1} />
            <span className="text-gray-500 whitespace-nowrap">% of</span>
            <MyInput type="number" placeholder="Y" value={y1} onChange={setY1} />
            <span className="text-gray-500">?</span>
          </div>

          <div className="flex items-center justify-end space-x-2 mt-4 md:mt-0">
            <span className="font-semibold text-xl">{calculateMode1()}</span>
            {calculateMode1() && <MyCopyButton value={calculateMode1()} />}
          </div>
        </div>
      </MyCard>

      <MyCard className="w-full max-w-4xl">
        <MyCard.Header
          title="Find the Percentage"
          helper="X is what percent of Y?"
        />

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 items-center">
          <div className="flex items-center space-x-2">
            <MyInput type="number" placeholder="X" value={x2} onChange={setX2} />
            <span className="text-gray-500 whitespace-nowrap">is what % of</span>
            <MyInput type="number" placeholder="Y" value={y2} onChange={setY2} />
            <span className="text-gray-500">?</span>
          </div>

          <div className="flex items-center justify-end space-x-2 mt-4 md:mt-0">
            <span className="font-semibold text-xl">{calculateMode2()}</span>
            {calculateMode2() && <MyCopyButton value={calculateMode2()} />}
          </div>
        </div>
      </MyCard>

      <MyCard className="w-full max-w-4xl">
        <MyCard.Header
          title="Percentage Change"
          helper="Calculate the percentage increase or decrease."
        />

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 items-center">
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 whitespace-nowrap">From</span>
            <MyInput type="number" placeholder="X" value={x3} onChange={setX3} />
            <span className="text-gray-500 whitespace-nowrap">to</span>
            <MyInput type="number" placeholder="Y" value={y3} onChange={setX3_2} />
            <span className="text-gray-500">?</span>
          </div>

          <div className="flex items-center justify-end space-x-2 mt-4 md:mt-0">
            <span className={`font-semibold text-xl ${calculateMode3().includes('Increase') ? 'text-green-500' : calculateMode3().includes('Decrease') ? 'text-red-500' : ''}`}>
              {calculateMode3()}
            </span>
            {calculateMode3() && <MyCopyButton value={calculateMode3()} />}
          </div>
        </div>
      </MyCard>
    </div>
  );
};

PercentageCalculator.title = "Percentage Calculator";
export default PercentageCalculator;
