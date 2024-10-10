import React from "react";
import { toast } from "react-toastify";

import { escape, unescape } from "@utils/backslashConvert";

import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MyCodeEditor from "@components/MyCodeEditor";

import { FaArrowRight } from "react-icons/fa";
import MyRadio from "@components/MyRadio";

const BackslashEscaper = () => {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [isEscape, setIsEscape] = React.useState(true);

  const convert = () => {
    try {
      setOutput(isEscape ? escape(input) : unescape(input));
      toast.success("Converted successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to convert!");
      console.error(error);
    }
  };

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Input" helper="Enter your text here">
          <div className="flex items-center">
            <MyRadio
              label="Escape"
              name="isEscape"
              value="escape"
              checked={isEscape}
              onChange={() => setIsEscape(true)}
            />

            <MyRadio
              label="Unescape"
              name="isEscape"
              value="unescape"
              checked={!isEscape}
              onChange={() => setIsEscape(false)}
              className="ml-4"
            />
          </div>

          <MyButton onClick={convert}>
            Convert
            <FaArrowRight className="ml-2" />
          </MyButton>
        </MyCard.Header>

        <MyCodeEditor
          language="text"
          value={input}
          onChange={(value) => setInput(value)}
        />
      </TwoColumn.Left>
      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="Here is your output" />

        <MyCodeEditor
          language="text"
          value={output}
          options={{ minimap: { enabled: false }, readOnly: true }}
        />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

BackslashEscaper.title = "Backslash Escaper";
export default BackslashEscaper;
