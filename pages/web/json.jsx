import React from "react";
import { json2xml } from "xml-js";
import { parse, stringify } from "yaml";
import { toast } from "react-toastify";

import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";

import MyCodeEditor from "@components/MyCodeEditor";
import MySelect from "@components/MySelect";

import { FaArrowRight } from "react-icons/fa";

const types = ["xml", "yaml"];

const JSONConverter = () => {
  const [json, setJson] = React.useState("");
  const [convertTo, setConvertTo] = React.useState("yaml");
  const [output, setOutput] = React.useState({
    xml: "",
    yaml: "",
  });

  const jsonToXml = (data) => {
    const xml = json2xml(data, { compact: true, spaces: 4 });
    setOutput((prev) => ({ ...prev, xml }));
  };

  const jsonToYaml = (data) => {
    const yamlObject = parse(data);
    const yaml = stringify(yamlObject, { indent: 2 });
    setOutput((prev) => ({ ...prev, yaml }));
  };

  const convertJson = () => {
    try {
      const data = JSON.parse(json);

      if (!Array.isArray(data)) {
        throw new Error("Invalid json");
      }

      jsonToXml(data);
      jsonToYaml(data);
    } catch (error) {
      toast.error(error.message || "Invalid json");
      console.error(error);
    }
  };

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Json Input" helper="Enter your json here">
          <MyButton size="sm" onClick={() => convertJson()}>
            Convert
            <FaArrowRight className="ml-2" />
          </MyButton>
        </MyCard.Header>

        <MyCodeEditor language="json" value={json} onChange={setJson} />
      </TwoColumn.Left>
      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="Converted json">
          <MySelect value={convertTo} onChange={setConvertTo} sizing="sm">
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </MySelect>
        </MyCard.Header>

        <MyCodeEditor
          language={convertTo}
          value={output[convertTo]}
          options={{ readOnly: true }}
          copy={true}
        />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

JSONConverter.title = "Json Converter";
export default JSONConverter;
