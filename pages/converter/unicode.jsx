import React from "react";

import { unicodeToText, textToUnicode } from "@utils/unicodeTextConverter";

import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyInput from "@components/MyInput";
import MyTextarea from "@components/MyTextarea";

const UnicodeConverter = () => {
  const [text, setText] = React.useState("");
  const [textToUnicodeOutput, setTextToUnicodeOutput] = React.useState("");

  const [unicode, setUnicode] = React.useState("");
  const [unicodeToTextOutput, setUnicodeToTextOutput] = React.useState("");

  React.useEffect(() => {
    setTextToUnicodeOutput(textToUnicode(text));
  }, [text]);

  React.useEffect(() => {
    setUnicodeToTextOutput(unicodeToText(unicode));
  }, [unicode]);

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header
          title="Text to Unicode"
          helper="Convert text to Unicode"
        />

        <MyInput
          value={text}
          onChange={setText}
          placeholder="Enter text"
          label="Text to convert"
          helper="Enter text to convert to Unicode"
        />

        <MyTextarea
          value={textToUnicodeOutput}
          placeholder="Unicode output"
          label="Unicode output"
        />
      </TwoColumn.Left>
      <TwoColumn.Right>
        <MyCard.Header
          title="Unicode to Text"
          helper="Convert Unicode to text"
        />

        <MyInput
          value={unicode}
          onChange={setUnicode}
          placeholder="Enter Unicode"
          label="Unicode to convert"
          helper="Enter Unicode to convert to text"
        />

        <MyTextarea
          value={unicodeToTextOutput}
          placeholder="Text output"
          label="Text output"
        />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

UnicodeConverter.title = "Unicode Converter";
export default UnicodeConverter;
