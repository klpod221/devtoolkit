import React from "react";
import { toast } from "react-toastify";

import jsonToYaml from "@utils/jsonToYaml";
import jsonToXml from "@utils/jsonToXml";

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
  const [output, setOutput] = React.useState({ xml: "", yaml: "" });

  const convertJson = () => {
    try {
      setOutput({ xml: "", yaml: "" });

      const xml = jsonToXml(json);
      const yaml = jsonToYaml(json);

      setOutput((prev) => ({ ...prev, xml, yaml }));

      toast.success("Converted successfully");
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
