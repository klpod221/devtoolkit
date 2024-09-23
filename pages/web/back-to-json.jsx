import React from "react";
import { toast } from "react-toastify";

import xmlToJson from "@utils/xmlToJson";
import yamlToJson from "@utils/yamlToJson";

import TwoColumn from "@components/TwoColumn";
import MyCodeEditor from "@components/MyCodeEditor";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MySelect from "@components/MySelect";

import { FaArrowRight } from "react-icons/fa";

const types = ["xml", "yaml"];

const BackToJSON = () => {
  const [language, setLanguage] = React.useState("xml");
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");

  const convertToJSON = () => {
    try {
      setOutput("");

      const json = language === "xml" ? xmlToJson(input) : yamlToJson(input);

      setOutput(json);
      toast.success("Converted successfully");
    } catch (error) {
      toast.error(error.message || "Invalid input");
      console.error(error);
    }
  };

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Input" helper="Enter your xml or yaml here">
          <MySelect value={language} onChange={setLanguage}>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </MySelect>

          <MyButton size="sm" onClick={() => convertToJSON()}>
            Convert
            <FaArrowRight className="ml-2" />
          </MyButton>
        </MyCard.Header>

        <MyCodeEditor language={language} value={input} onChange={setInput} />
      </TwoColumn.Left>
      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="Converted json" />

        <MyCodeEditor
          language="json"
          value={output}
          options={{ readOnly: true }}
          copy={true}
        />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

BackToJSON.title = "Back to JSON";
export default BackToJSON;
