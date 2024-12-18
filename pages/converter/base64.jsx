import React from "react";
import { toast } from "react-toastify";

import CodeOutput from "@components/CodeOutput";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MyTextarea from "@components/MyTextarea";

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

  return (
    <MyCard className="w-full max-w-5xl">
      <div className="w-full h-full">
        <MyTextarea label="Input" value={input} onChange={setInput} />

        <div className="flex justify-center items-center space-x-4 my-2">
          <MyButton onClick={encode}>Encode</MyButton>
          <MyButton onClick={decode}>Decode</MyButton>
        </div>

        <div className="text-base">Output</div>

        <div className="h-24">
          <CodeOutput language="text" output={output} />
        </div>
      </div>
    </MyCard>
  );
};

Base64EncoderDecoder.title = "Base64 Encoder/Decoder";
export default Base64EncoderDecoder;
