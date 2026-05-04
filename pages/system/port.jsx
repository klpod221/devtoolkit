import React, { useState, useEffect } from "react";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MyInput from "@components/MyInput";
import MyRangeSlider from "@components/MyRangeSlider";
import MyCopyButton from "@components/MyCopyButton";
import ObjectOutput from "@components/ObjectOutput";
import { generateRandomPort } from "@utils/systemUtils";
import { FaArrowRight } from "react-icons/fa";

const RandomPortGenerator = () => {
  const [range, setRange] = useState({ min: 1024, max: 65535 });
  const [port, setPort] = useState("");

  const handleGenerate = () => {
    setPort(generateRandomPort(range.min, range.max).toString());
  };

  useEffect(() => {
    handleGenerate();
  }, [range.min, range.max]);

  return (
    <div className="flex flex-col items-center">
      <MyCard className="w-full max-w-2xl">
        <MyCard.Header 
          title="Random Port Generator" 
          helper="Generate random port numbers within a specified range."
        >
          <MyButton onClick={handleGenerate}>
            Generate <FaArrowRight className="ml-2" />
          </MyButton>
        </MyCard.Header>

        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-200 dark:border-dark-secondary">
            <span className="text-sm uppercase tracking-widest text-gray-500 mb-2">Generated Port</span>
            <div className="flex items-center space-x-4">
              <span className="text-6xl font-bold text-blue-600 dark:text-blue-400 font-mono">
                {port}
              </span>
              <MyCopyButton value={port} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MyInput
              type="number"
              label="Minimum Port"
              value={range.min}
              onChange={(val) => setRange(prev => ({ ...prev, min: parseInt(val) || 0 }))}
              min={0}
              max={range.max}
            />

            <MyInput
              type="number"
              label="Maximum Port"
              value={range.max}
              onChange={(val) => setRange(prev => ({ ...prev, max: parseInt(val) || 0 }))}
              min={range.min}
              max={65535}
            />
          </div>

          <div className="pt-2">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Range Visualizer (Max Port)
            </label>
            <MyRangeSlider
              min={0}
              max={65535}
              value={range.max}
              onChange={(val) => setRange(prev => ({ ...prev, max: val }))}
            />
          </div>

          <hr className="border-gray-200 dark:border-dark-secondary" />

          <MyCard.Header title="Details" />
          <ObjectOutput 
            data={{
              "Port Number": port,
              "Range Used": `${range.min} - ${range.max}`,
              "Classification": port < 1024 ? "Well-known/System" : (port < 49152 ? "Registered/User" : "Dynamic/Private")
            }} 
          />
        </div>
      </MyCard>
    </div>
  );
};

RandomPortGenerator.title = "Random Port Generator";
export default RandomPortGenerator;
