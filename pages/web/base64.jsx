import React from "react";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import CodeOutput from "@components/CodeOutput";

const Base64EncoderDecoder = () => {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");

  const encode = () => {
    setOutput(btoa(input));
    toast.success("Encoded successfully");
  };

  const decode = () => {
    setOutput(atob(input));
    toast.success("Decoded successfully");
  };

  const onCopy = () => {
    navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard");
  };

  return (
    <MyCard className="w-full">
      <div className="w-full h-full">
        <div className="font-semibold text-gray-800 dark:text-dark-text">
          Input
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-24 border border-gray-200 dark:border-dark-secondary p-2 dark:bg-dark dark:text-dark-text"
        />

        <div className="flex justify-center items-center space-x-4 my-2">
          <MyButton onClick={encode}>Encode</MyButton>
          <MyButton onClick={decode}>Decode</MyButton>
        </div>

        <div className="font-semibold text-gray-800 dark:text-dark-text">
          Output
        </div>

        <div className="h-24">
          <CodeOutput language="plaintext" output={output} />
        </div>
      </div>
    </MyCard>
  );
};

Base64EncoderDecoder.title = "Base64 Encoder/Decoder";
export default Base64EncoderDecoder;
