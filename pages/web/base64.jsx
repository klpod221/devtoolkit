import React from "react";
import { Card, Button } from "flowbite-react";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";

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
    <Card className="w-full">
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Base64 Encoder/Decoder
        </div>
      </div>

      <div className="w-full h-full">
        <div className="font-semibold text-gray-800 dark:text-gray-200">
          Input
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full h-24 border border-gray-200 dark:border-gray-700 p-2 dark:bg-dark dark:text-gray-200"
        />

        <div className="flex justify-center items-center space-x-4 my-2">
          <Button onClick={encode}>Encode</Button>
          <Button onClick={decode}>Decode</Button>
        </div>

        <div className="font-semibold text-gray-800 dark:text-gray-200">
          Output
        </div>

        <div className="relative group">
          <div
            className="absolute top-2 right-2 cursor-pointer z-10 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hidden group-hover:block transition-all duration-300"
            onClick={onCopy}
          >
            <FaRegCopy className="text-gray-800 dark:text-gray-200" />
          </div>

          <textarea
            value={output}
            className="w-full h-24 border border-gray-200 dark:border-gray-700 p-2 dark:bg-gray-800 dark:text-gray-200"
            readOnly
          />
        </div>
      </div>
    </Card>
  );
};

Base64EncoderDecoder.title = "Base64 Encoder/Decoder";
export default Base64EncoderDecoder;
