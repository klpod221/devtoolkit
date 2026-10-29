import React from "react";
import { toast } from "react-toastify";

import calculatePI from "@utils/piCalculator";

import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MyInput from "@components/MyInput";

import { FaArrowRight } from "react-icons/fa";
import CodeOutput from "@components/CodeOutput";
import MyCheckbox from "@components/MyCheckbox";

const PICalculator = () => {
  const [numberOfDigits, setNumberOfDigits] = React.useState(100);
  const [addCount, setAddCount] = React.useState(true);
  const [addSpace, setAddSpace] = React.useState(true);

  const [output, setOutput] = React.useState({
    result: "",
    time: "",
  });

  const startCalculatePI = () => {
    const digits = Number(numberOfDigits);
    if (!digits || digits < 1) {
      toast.error("Please enter a number greater than 0.");
      return;
    }

    if (digits > 10000) {
      toast.error("Maximum supported digits is 10,000.");
      return;
    }

    const result = calculatePI(digits, addCount, addSpace);
    setOutput(result);
  };

  return (
    <TwoColumn leftWidth="40">
      <TwoColumn.Left>
        <MyCard.Header
          title="Input"
          helper="Enter the number of terms to calculate PI."
        >
          <MyButton onClick={() => startCalculatePI()}>
            Calculate <FaArrowRight className="ml-2" />
          </MyButton>
        </MyCard.Header>

        <MyInput
          label="Number of Digits"
          type="number"
          value={numberOfDigits}
          onChange={setNumberOfDigits}
        />

        <MyCheckbox
          label="Add Count"
          checked={addCount}
          onChange={(e) => setAddCount(e.target.checked)}
        />

        <MyCheckbox
          label="Add Space"
          checked={addSpace}
          onChange={(e) => setAddSpace(e.target.checked)}
        />
      </TwoColumn.Left>
      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="PI result.">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Time took: {output.time != null ? output.time : "N/A"}
          </span>
        </MyCard.Header>

        <CodeOutput output={output.result} />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

PICalculator.title = "PI Calculator";
export default PICalculator;
