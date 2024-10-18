import React from "react";

import { textToBinary, binaryToText } from "@utils/asciiBinaryConverter";

import MyCard from "@components/MyCard";
import TwoColumn from "@components/TwoColumn";
import MyTextarea from "@components/MyTextarea";

const ASCIIBinaryConverter = () => {
  const [text, setText] = React.useState("Hello, World!");
  const [textToBinaryOutput, setTextToBinaryOutput] = React.useState(
    "01001000 01100101 01101100 01101100 01101111 00101100 00100000 01010111 01101111 01110010 01101100 01100100 00100001",
  );

  const [binary, setBinary] = React.useState(
    "01001000 01100101 01101100 01101100 01101111 00101100 00100000 01010111 01101111 01110010 01101100 01100100 00100001",
  );
  const [binaryToTextOutput, setBinaryToTextOutput] =
    React.useState("Hello, World!");

  React.useEffect(() => {
    try {
      setTextToBinaryOutput(textToBinary(text));
    } catch (error) {
      setTextToBinaryOutput("");
      console.log(error);
    }
  }, [text]);

  React.useEffect(() => {
    try {
      setBinaryToTextOutput(binaryToText(binary));
    } catch (error) {
      setBinaryToTextOutput("");
      console.log(error);
    }
  }, [binary]);

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Text to ASCII binary" />

        <MyTextarea
          label="Enter text to convert to ASCII binary"
          placeholder="Hello, World!"
          rows={5}
          value={text}
          onChange={setText}
        />

        <MyTextarea
          label="ASCII binary"
          placeholder="01001000 01100101 01101100 01101100 01101111 00101100 00100000 01010111 01101111 01110010 01101100 01100100 00100001"
          rows={5}
          value={textToBinaryOutput}
          readOnly
        />
      </TwoColumn.Left>
      <TwoColumn.Right>
        <MyCard.Header title="ASCII binary to text" />

        <MyTextarea
          label="Enter ASCII binary to convert to text"
          placeholder="01001000 01100101 01101100 01101100 01101111 00101100 00100000 01010111 01101111 01110010 01101100 01100100 00100001"
          rows={5}
          value={binary}
          onChange={setBinary}
        />

        <MyTextarea
          label="Text"
          placeholder="Hello, World!"
          rows={5}
          value={binaryToTextOutput}
          readOnly
        />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

ASCIIBinaryConverter.title = "ASCII Binary Converter";
export default ASCIIBinaryConverter;
