import React from "react";
import { toast } from "react-toastify";
import MyCard from "@components/MyCard";
import { AiOutlineLock, AiOutlineUnlock } from "react-icons/ai";
import { Label } from "flowbite-react";
import MyButton from "@components/MyButton";
import MyInput from "@components/MyInput";
import MyTextarea from "@components/MyTextarea";

const UrlEncoderDecoder = () => {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");

  const encodeUrl = () => {
    try {
      if (!input.trim()) {
        toast.error("Please enter some text to encode");
        return;
      }

      const encoded = encodeURIComponent(input);
      setOutput(encoded);
      toast.success("Encoded successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error encoding");
    }
  };

  const decodeUrl = () => {
    try {
      if (!input.trim()) {
        toast.error("Please enter some text to decode");
        return;
      }

      const decoded = decodeURIComponent(input);
      setOutput(decoded);
      toast.success("Decoded successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error decoding");
    }
  }

  return (
    <MyCard>
      <MyCard.Header
        title="Url Encoder/Decoder"
        helper="Encode or decode url strings."
      >
        <div className="flex justify-center items-center space-x-2">
          <MyButton size="sm" onClick={encodeUrl}>
            <AiOutlineLock className="w-5 h-5 mr-2" />
            Encode
          </MyButton>

          <MyButton size="sm" onClick={decodeUrl}>
            <AiOutlineUnlock className="w-5 h-5 mr-2" />
            Decode
          </MyButton>
        </div>
      </MyCard.Header>

      <div className="flex flex-col">
        <Label
          htmlFor="url"
          value="Url Input"
          className="text-md font-semibold"
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
          className="text-md font-semibold"
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
