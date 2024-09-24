import React from "react";
import { toast } from "react-toastify";

import randomString from "@utils/randomString";

import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MyInput from "@components/MyInput";
import MyCodeEditor from "@components/MyCodeEditor";

import { FaArrowRight } from "react-icons/fa";
import MyCheckbox from "@components/MyCheckbox";

const RandomString = () => {
  const [quantity, setQuantity] = React.useState(5);
  const [length, setLength] = React.useState(10);

  const [options, setOptions] = React.useState({
    lowercase: true,
    uppercase: true,
    numbers: true,
  });

  const [output, setOutput] = React.useState("");

  const generator = () => {
    try {
      if (!options.lowercase && !options.uppercase && !options.numbers) {
        throw new Error("At least one option must be selected.");
      }

      if (length < 1) {
        throw new Error("Length must be at least 1.");
      }

      if (quantity < 1) {
        throw new Error("Quantity must be at least 1.");
      }

      let generatedText = "";
      for (let i = 0; i < quantity; i++) {
        generatedText += randomString(length, options) + "\n";
      }

      setOutput(generatedText);
    } catch (error) {
      toast.error(error.message || "An error occurred.");
      console.error(error);
    }
  };

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header
          title="Input"
          helper="Enter options for generating random string."
        >
          <MyButton onClick={() => generator()}>
            Generate
            <FaArrowRight className="ml-2" />
          </MyButton>
        </MyCard.Header>

        <MyInput
          label="How many strings to generate?"
          placeholder="Enter number of strings to generate"
          type="number"
          value={quantity}
          onChange={setQuantity}
          min="1"
          max="1000"
          step="1"
        />

        <MyInput
          label="How long for each string?"
          placeholder="Enter length of each string"
          type="number"
          value={length}
          onChange={setLength}
          min="1"
          max="1000"
          step="1"
        />

        <MyCheckbox
          label="Allow lowercase letters (a-z)"
          checked={options.lowercase}
          onChange={(e) =>
            setOptions({ ...options, lowercase: e.target.checked })
          }
        />

        <MyCheckbox
          label="Allow uppercase letters (A-Z)"
          checked={options.uppercase}
          onChange={(e) =>
            setOptions({ ...options, uppercase: e.target.checked })
          }
        />

        <MyCheckbox
          label="Allow numbers (0-9)"
          checked={options.numbers}
          onChange={(e) =>
            setOptions({ ...options, numbers: e.target.checked })
          }
        />
      </TwoColumn.Left>
      <TwoColumn.Right>
        <MyCard.Header
          title="Output"
          helper="Your generated text will appear here."
        />

        <MyCodeEditor
          language="plaintext"
          value={output}
          options={{ minimap: { enabled: false }, readOnly: true }}
        />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

RandomString.title = "Random String";
export default RandomString;
