import React from "react";
import { toast } from "react-toastify";

import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MyInput from "@components/MyInput";
import MyTextarea from "@components/MyTextarea";

import { AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";

const UrlEncoderDecoder = () => {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");

  const encodeUrl = (isComponent = false) => {
    try {
      if (!input.trim()) {
        toast.error("Please enter some text to encode");
        return;
      }

      const encoded = isComponent ? encodeURIComponent(input) : encodeURI(input);
      setOutput(encoded);
      toast.success("Encoded successfully");
    } catch (error) {
      toast.error(error.message || "Error encoding");
      console.error(error);
    }
  };

  const decodeUrl = (isComponent = false) => {
    try {
      if (!input.trim()) {
        toast.error("Please enter some text to decode");
        return;
      }

      const decoded = isComponent ? decodeURIComponent(input) : decodeURI(input);
      setOutput(decoded);
      toast.success("Decoded successfully");
    } catch (error) {
      toast.error(error.message || "Error decoding");
      console.error(error);
    }
  };

  return (
    <MyCard>
      <MyCard.Header
        title="Url Encoder/Decoder"
        helper="Encode or decode url strings."
      >
        <div className="flex flex-wrap gap-2">
          <MyButton onClick={() => encodeUrl(false)}>
            <AiOutlineLock className="w-5 h-5 mr-1" />
            Encode URI
          </MyButton>

          <MyButton onClick={() => encodeUrl(true)}>
            <AiOutlineLock className="w-5 h-5 mr-1" />
            Encode Component
          </MyButton>

          <MyButton onClick={() => decodeUrl(true)}>
            <AiOutlineUnlock className="w-5 h-5 mr-1" />
            Decode
          </MyButton>
        </div>
      </MyCard.Header>

      <div className="flex flex-col">
        <label htmlFor="url" className="text-base">
          Url Input
        </label>

        <MyInput
          id="url"
          value={input}
          onChange={setInput}
          placeholder="Enter url to encode/decode"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="output" className="text-base">
          Output
        </label>

        <MyTextarea
          id="output"
          value={output}
          rows={4}
          readOnly
          placeholder="Output will be shown here"
        />
      </div>
    </MyCard>
  );
};

UrlEncoderDecoder.title = "Url Encoder/Decoder";
export default UrlEncoderDecoder;
