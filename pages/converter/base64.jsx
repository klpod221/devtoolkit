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
    try {
      if (!input) {
        setOutput("");
        return;
      }
      const bytes = new TextEncoder().encode(input);
      let binary = "";
      for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      setOutput(btoa(binary));
      toast.success("Encoded successfully");
    } catch (err) {
      toast.error("Failed to encode: " + err.message);
    }
  };

  const decode = () => {
    try {
      if (!input) {
        setOutput("");
        return;
      }
      const binary = atob(input.trim());
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      setOutput(new TextDecoder().decode(bytes));
      toast.success("Decoded successfully");
    } catch (err) {
      toast.error("Invalid base64 string: " + err.message);
    }
  };

  return (
    <MyCard className="w-full max-w-4xl mx-auto">
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
