import React from "react";

import natoAlphabetConverter from "@utils/natoAlphabetConverter";

import MyCard from "@components/MyCard";
import MyInput from "@components/MyInput";
import MyTextarea from "@components/MyTextarea";

const NATOAlphabetConverter = () => {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");

  React.useEffect(() => {
    setOutput(natoAlphabetConverter(input));
  }, [input]);

  return (
    <MyCard className="w-full max-w-xl">
      <MyCard.Header
        title="Text to NATO alphabet"
        helper="Transform text into the NATO phonetic alphabet for oral transmission."
      />

      <MyInput
        label="Input"
        value={input}
        onChange={setInput}
        placeholder="Enter your text here"
      />

      <MyTextarea
        label="Output"
        value={output}
        placeholder="Output will be displayed here"
        readOnly
      />
    </MyCard>
  );
};

NATOAlphabetConverter.title = "NATO Alphabet Converter";
export default NATOAlphabetConverter;
