import React from "react";

import unicodeToHex from "@utils/unicodeToHex";

import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyCodeEditor from "@components/MyCodeEditor";
import MyCopyButton from "@components/MyCopyButton";

const UnicodeToHex = () => {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");

  React.useEffect(() => {
    setOutput(unicodeToHex(input));
  }, [input]);

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Input" helper="Enter the string" />

        <MyCodeEditor language="plaintext" value={input} onChange={setInput} />
      </TwoColumn.Left>
      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="Hexadecimal representation">
          <MyCopyButton value={output} type="button" />
        </MyCard.Header>

        <MyCodeEditor
          language="plaintext"
          value={output}
          options={{ minimap: { enabled: false }, readOnly: true }}
        />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

UnicodeToHex.title = "Unicode To Hex";
export default UnicodeToHex;
