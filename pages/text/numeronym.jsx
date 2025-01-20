import React from "react";

import MyCard from "@components/MyCard";
import MyInput from "@components/MyInput";
import MyCopyButton from "@components/MyCopyButton";

const NumeronymGenerator = () => {
  const [input, setInput] = React.useState("internationalization");
  const [output, setOutput] = React.useState("");

  React.useEffect(() => {
    if (!input) {
      setOutput("");
      return;
    }

    const firstChar = input[0];
    const lastChar = input[input.length - 1];
    const middle = input.length - 2;

    setOutput(`${firstChar}${middle}${lastChar}`);
  }, [input]);

  return (
    <MyCard className="w-full max-w-5xl">
      <p>
        A <strong>numeronym</strong> is a word where a number is used to
        represent some of the letters in the word. For example, the word{" "}
        <strong>internationalization</strong> can be represented as{" "}
        <strong>i18n</strong>.
      </p>

      <MyInput
        label="Input"
        placeholder="Enter a string"
        value={input}
        onChange={setInput}
      />

      <MyInput
        label="Output"
        placeholder="Numeronym"
        value={output}
        onChange={setOutput}
        readOnly
        additional={<MyCopyButton value={output} />}
      />
    </MyCard>
  );
};

NumeronymGenerator.title = "Numeronym Generator";
export default NumeronymGenerator;
