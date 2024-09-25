import React from "react";
import { toast } from "react-toastify";

import generateLoremIpsum from "@utils/generateLoremIpsum";

import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MyInput from "@components/MyInput";
import MyRadio from "@components/MyRadio";
import MyCheckbox from "@components/MyCheckbox";
import MyCodeEditor from "@components/MyCodeEditor";

import { FaArrowRight } from "react-icons/fa";
import MyCopyButton from "@components/MyCopyButton";

const typeOptions = ["words", "sentences", "paragraphs"];

const LoremIpsum = () => {
  const [length, setLength] = React.useState(5);
  const [type, setType] = React.useState("words");
  const [isStartWithLorem, setIsStartWithLorem] = React.useState(true);

  const [output, setOutput] = React.useState("");

  const generator = () => {
    try {
      const generatedText = generateLoremIpsum(length, type, isStartWithLorem);
      setOutput(generatedText);
      toast.success("Text generated successfully.");
    } catch (error) {
      toast.error(error.message || "An error occurred.");
      console.error(error);
    }
  };

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Input" helper="Enter style of Lorem Ipsum below.">
          <MyButton onClick={() => generator()}>
            Generate
            <FaArrowRight className="ml-2" />
          </MyButton>
        </MyCard.Header>

        <MyInput
          label="How long to generate?"
          placeholder="Enter number of words, sentences or paragraphs"
          type="number"
          value={length}
          onChange={setLength}
          min="1"
          max="1000"
          step="1"
        />

        <div className="flex items-center space-x-4">
          {typeOptions.map((option) => (
            <MyRadio
              key={option}
              label={option}
              id={option}
              name="type"
              checked={type === option}
              onChange={() => setType(option)}
            />
          ))}
        </div>

        <MyCheckbox
          label="Start with 'Lorem ipsum ...'"
          checked={isStartWithLorem}
          onChange={() => setIsStartWithLorem(!isStartWithLorem)}
        />
      </TwoColumn.Left>
      <TwoColumn.Right>
        <MyCard.Header
          title="Output"
          helper="Generated text will be displayed here."
        >
          <MyCopyButton value={output} type="button" />
        </MyCard.Header>

        <MyCodeEditor
          language="text"
          value={output}
          options={{ minimap: { enabled: false }, readOnly: true }}
        />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

LoremIpsum.title = "Lorem Ipsum Generator";
export default LoremIpsum;
