import React, { useState, useEffect } from "react";
import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MySelect from "@components/MySelect";
import MyCodeEditor from "@components/MyCodeEditor";
import MyButton from "@components/MyButton";
import { toast } from "react-toastify";
import beautify from 'js-beautify';
import { FaTrash, FaCopy } from "react-icons/fa";
import { copyToClipboard } from "@utils/copyToClipboard";

const DataTextFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [format, setFormat] = useState("json");

  const formatData = (val, currentFormat) => {
    if (!val.trim()) {
      setOutput("");
      return;
    }

    try {
      if (currentFormat === "json") {
        const parsed = JSON.parse(val);
        setOutput(JSON.stringify(parsed, null, 2));
      } else if (currentFormat === "xml") {
        setOutput(beautify.html(val, { indent_size: 2, wrap_line_length: 0 }));
      } else if (currentFormat === "css") {
        setOutput(beautify.css(val, { indent_size: 2 }));
      } else if (currentFormat === "html") {
        setOutput(beautify.html(val, { indent_size: 2 }));
      } else if (currentFormat === "javascript") {
        setOutput(beautify.js(val, { indent_size: 2 }));
      } else {
        setOutput(val);
      }
    } catch (err) {
      // Silently fail during typing, or show indicator if needed
      setOutput("");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      formatData(input, format);
    }, 200);
    return () => clearTimeout(timer);
  }, [input, format]);

  const handleCopy = () => {
    if (!output) return;
    copyToClipboard(output);
    toast.success("Copied to clipboard");
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Input" helper="Paste your raw data here">
          <MyButton color="gray" onClick={handleClear} sizing="sm">
            <FaTrash className="mr-2" /> Clear
          </MyButton>
        </MyCard.Header>

        <div className="h-[600px] mt-4">
          <MyCodeEditor
            value={input}
            onChange={setInput}
            language={format}
            className="h-full"
          />
        </div>
      </TwoColumn.Left>

      <TwoColumn.Right>
        <MyCard.Header title="Formatted" helper="Resulting beautiful data">
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
          <MyButton onClick={handleCopy} disabled={!output} sizing="sm">
            <FaCopy className="mr-2" /> Copy
          </MyButton>
        </MyCard.Header>
        
        <div className="h-[600px] mt-4">
          <MyCodeEditor
            value={output}
            readOnly={true}
            language={format}
            className="h-full"
          />
        </div>
      </TwoColumn.Right>
    </TwoColumn>
  );
};

DataTextFormatter.title = "Data text formatter";
export default DataTextFormatter;
