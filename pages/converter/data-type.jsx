import React from "react";
import { toast } from "react-toastify";

import jsonToYaml from "@utils/jsonToYaml";
import jsonToXml from "@utils/jsonToXml";
import xmlToJson from "@utils/xmlToJson";
import yamlToJson from "@utils/yamlToJson";

import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MyCodeEditor from "@components/MyCodeEditor";
import MySelect from "@components/MySelect";

import { FaArrowRight } from "react-icons/fa";

const FORMATS = [
  { label: "JSON", value: "json" },
  { label: "XML", value: "xml" },
  { label: "YAML", value: "yaml" },
];

const INITIAL_JSON = `{
  "name": "DevToolkit",
  "version": "1.0.0",
  "features": [
    "Converters",
    "Generators",
    "Formatters"
  ]
}`;

const DataTypeConverter = () => {
  const [sourceFormat, setSourceFormat] = React.useState("json");
  const [targetFormat, setTargetFormat] = React.useState("yaml");
  const [input, setInput] = React.useState(INITIAL_JSON);
  const [output, setOutput] = React.useState("");

  const convertData = () => {
    try {
      if (!input.trim()) {
        setOutput("");
        return;
      }

      if (sourceFormat === targetFormat) {
        setOutput(input);
        toast.success("Converted successfully");
        return;
      }

      let intermediateJson = "";

      if (sourceFormat === "json") {
        // Validate JSON
        JSON.parse(input);
        intermediateJson = input;
      } else if (sourceFormat === "xml") {
        intermediateJson = xmlToJson(input);
      } else if (sourceFormat === "yaml") {
        intermediateJson = yamlToJson(input);
      }

      let result = "";
      if (targetFormat === "json") {
        result = intermediateJson;
      } else if (targetFormat === "xml") {
        result = jsonToXml(intermediateJson);
      } else if (targetFormat === "yaml") {
        result = jsonToYaml(intermediateJson);
      }

      setOutput(result);
      toast.success("Converted successfully");
    } catch (error) {
      toast.error(error.message || `Invalid ${sourceFormat.toUpperCase()} input`);
      console.error(error);
    }
  };

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Input" helper={`Enter your ${sourceFormat.toUpperCase()} data here`}>
          <div className="flex items-center space-x-2">
            <MySelect
              value={sourceFormat}
              onChange={(val) => {
                setSourceFormat(val);
                setOutput("");
              }}
            >
              {FORMATS.map((fmt) => (
                <option key={fmt.value} value={fmt.value}>
                  {fmt.label}
                </option>
              ))}
            </MySelect>
            <MyButton onClick={convertData}>
              Convert
              <FaArrowRight className="ml-2" />
            </MyButton>
          </div>
        </MyCard.Header>

        <MyCodeEditor
          language={sourceFormat}
          value={input}
          onChange={setInput}
        />
      </TwoColumn.Left>

      <TwoColumn.Right>
        <MyCard.Header title="Output" helper={`Converted ${targetFormat.toUpperCase()}`}>
          <MySelect
            value={targetFormat}
            onChange={(val) => {
              setTargetFormat(val);
              setOutput("");
            }}
          >
            {FORMATS.map((fmt) => (
              <option key={fmt.value} value={fmt.value}>
                {fmt.label}
              </option>
            ))}
          </MySelect>
        </MyCard.Header>

        <MyCodeEditor
          language={targetFormat}
          value={output}
          options={{ readOnly: true }}
        />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

DataTypeConverter.title = "Data Type Converter";
export default DataTypeConverter;
