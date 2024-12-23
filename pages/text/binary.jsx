import React from "react";
import _ from "lodash";

import binaryTranslator from "@utils/binaryTranslator";

import MyCard from "@components/MyCard";
import MySelect from "@components/MySelect";
import MyTextarea from "@components/MyTextarea";

const options = [
  { value: "text", label: "Text" },
  { value: "binary", label: "Binary" },
  { value: "octal", label: "Octal" },
  { value: "decimal", label: "Decimal" },
  { value: "hex", label: "Hex" },
];

const BinaryTranslator = () => {
  const [input, setInput] = React.useState("klpod221");
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState("");

  const [from, setFrom] = React.useState("text");
  const [to, setTo] = React.useState("binary");

  const handleTranslate = React.useMemo(
    () =>
      _.debounce(() => {
        try {
          setOutput(binaryTranslator(from, to, input));
          setError("");
        } catch (error) {
          setOutput("");
          setError(error.message);
        }
      }, 300),
    [from, to, input],
  );

  React.useEffect(() => {
    handleTranslate();
  }, [from, to, input, handleTranslate]);

  return (
    <MyCard className="w-full max-w-4xl">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <MySelect
          sizing="md"
          label="From"
          value={from}
          onChange={setFrom}
          className="flex-1"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </MySelect>

        <MySelect sizing="md" label="To" value={to} onChange={setTo}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </MySelect>
      </div>

      <MyTextarea
        label="Input"
        value={input}
        onChange={setInput}
        error={error}
      />

      <MyTextarea label="Output" value={output} readOnly />
    </MyCard>
  );
};

BinaryTranslator.title = "Binary Translator";
export default BinaryTranslator;
