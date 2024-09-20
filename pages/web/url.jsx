import React from "react";
import { toast } from "react-toastify";
import { Label } from "flowbite-react";

import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MyInput from "@components/MyInput";
import MyTextarea from "@components/MyTextarea";

import { AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";

const UrlEncoderDecoder = () => {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");

  const encodeUrl = () => {
    try {
      if (!input.trim()) {
        toast.error("Please enter some text to encode");
        return;
      }

      const encoded = encodeURI(input);
      setOutput(encoded);
      toast.success("Encoded successfully");
    } catch (error) {
      toast.error(error.message || "Error encoding");
      console.error(error);
    }
  };

  const decodeUrl = () => {
    try {
      if (!input.trim()) {
        toast.error("Please enter some text to decode");
        return;
      }

      const decoded = decodeURI(input);
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
        <MyButton size="sm" onClick={encodeUrl}>
          <AiOutlineLock className="w-5 h-5 mr-2" />
          Encode
        </MyButton>

        <MyButton size="sm" onClick={decodeUrl}>
          <AiOutlineUnlock className="w-5 h-5 mr-2" />
          Decode
        </MyButton>
      </MyCard.Header>

      <div className="flex flex-col">
        <Label
          htmlFor="url"
          value="Url Input"
          className="text-base font-semibold"
        />

        <MyInput
          id="url"
          value={input}
          onChange={setInput}
          placeholder="Enter url to encode/decode"
        />
      </div>

      <div className="flex flex-col">
        <Label
          htmlFor="output"
          value="Output"
          className="text-base font-semibold"
        />

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
