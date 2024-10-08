import React from "react";

import convertTextCase from "@utils/convertTextCase";

import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyCodeEditor from "@components/MyCodeEditor";
import MyCopyButton from "@components/MyCopyButton";
import MySelect from "@components/MySelect";

const caseOptions = [
  {
    label: "lowercase",
    value: "lowercase",
  },
  {
    label: "UPPERCASE",
    value: "uppercase",
  },
  {
    label: "Capitalize",
    value: "capitalize",
  },
  {
    label: "camelCase",
    value: "camelCase",
  },
  {
    label: "PascalCase",
    value: "pascalCase",
  },
  {
    label: "snake_case",
    value: "snake_case",
  },
  {
    label: "kebab-case",
    value: "kebab-case",
  },
];

const TextCaseConverter = () => {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");

  const [caseType, setCaseType] = React.useState("lowercase");

  React.useEffect(() => {
    setOutput(convertTextCase(input, caseType));
  }, [input, caseType]);

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Input" helper="Enter the text to convert" />

        <MyCodeEditor language="text" value={input} onChange={setInput} />
      </TwoColumn.Left>
      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="Converted text">
          <MySelect value={caseType} onChange={setCaseType}>
            {caseOptions.map((option) => (
              <option key={option.value} value={option.value}>
                <span>{option.label}</span>
              </option>
            ))}
          </MySelect>

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

TextCaseConverter.title = "Text Case Converter";
export default TextCaseConverter;
