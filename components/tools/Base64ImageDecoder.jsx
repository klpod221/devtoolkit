import React from "react";

import MyImage from "@components/MyImage";
import MyButton from "@components/MyButton";
import MyTextarea from "@components/MyTextarea";

const Base64ImageDecoder = () => {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState();

  const convertImages = () => {
    if (!input) {
      return;
    }

    const isDataUrl = input.match(/^data:image\/([a-zA-Z]*);base64,([^"]*)/g);

    if (!isDataUrl) {
      setOutput(`data:image/png;base64,${input}`);
    } else {
      setOutput(input);
    }
  };

  return (
    <>
      <MyTextarea label="Input" value={input} onChange={setInput} />

      <div className="flex justify-center items-center space-x-4 my-2">
        <MyButton onClick={convertImages}>Convert</MyButton>
      </div>

      {output && (
        <div className="flex flex-wrap mb-4 space-x-2">
          <div
            className="relative group overflow-hidden rounded-lg w-40 h-40"
          >
            <MyImage
              src={output}
              alt="image"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Base64ImageDecoder;
