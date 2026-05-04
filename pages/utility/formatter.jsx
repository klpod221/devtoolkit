import React, { useState, useEffect } from "react";
import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MySelect from "@components/MySelect";
import MyCodeEditor from "@components/MyCodeEditor";
import MyButton from "@components/MyButton";
import CodeOutput from "@components/CodeOutput";
import { FaTrash } from "react-icons/fa";
import beautify from 'js-beautify';

const DataTextFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [format, setFormat] = useState("json");

  const formatData = (val, currentFormat) => {
    if (!val.trim()) {
      setOutput("");
      setError("");
      return;
    }

    try {
      let result = "";
      if (currentFormat === "json") {
        const parsed = JSON.parse(val);
        result = JSON.stringify(parsed, null, 2);
      } else if (currentFormat === "xml" || currentFormat === "html") {
        result = beautify.html(val, { indent_size: 2, wrap_line_length: 0 });
      } else if (currentFormat === "css") {
        result = beautify.css(val, { indent_size: 2 });
      } else if (currentFormat === "javascript") {
        result = beautify.js(val, { indent_size: 2 });
      } else {
        result = val;
      }
      setOutput(result);
      setError("");
    } catch (err) {
      setError(err.message);
      setOutput("");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      formatData(input, format);
    }, 300);
    return () => clearTimeout(timer);
  }, [input, format]);

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <TwoColumn leftWidth={70}>
      <TwoColumn.Left>
        <MyCard.Header title="Input" helper="Paste your raw data here">
          <MySelect
            value={format}
            onChange={(val) => setFormat(val)}
            sizing="sm"
            className="w-32"
          >
            <option value="json">JSON</option>
            <option value="xml">XML</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="javascript">JS</option>
          </MySelect>
          
          <MyButton color="gray" onClick={handleClear} sizing="sm">
            <FaTrash className="mr-2" /> Clear
          </MyButton>
        </MyCard.Header>

        <div className="h-[600px] mt-4">
          <MyCodeEditor
            value={input}
            onChange={setInput}
            language={format === "javascript" ? "javascript" : format}
            className="h-full"
          />
        </div>
      </TwoColumn.Left>

      <TwoColumn.Right>
        <div className="flex h-full flex-col">
          <div className="flex mb-1 justify-between items-center">
            <span className="text-base font-semibold">OUTPUT</span>
            {output && !error && (
               <span className="text-xs text-green-500 font-medium italic">Formatted Successfully</span>
            )}
          </div>

          <CodeOutput
            language={format}
            output={output}
            error={error}
          />
        </div>
      </TwoColumn.Right>
    </TwoColumn>
  );
};

DataTextFormatter.title = "Data text formatter";
export default DataTextFormatter;
