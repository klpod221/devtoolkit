import React from "react";

import hexToUnicode from "@utils/hexToUnicode";

import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyCodeEditor from "@components/MyCodeEditor";
import MyCopyButton from "@components/MyCopyButton";

const HexToUnicode = () => {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");

  React.useEffect(() => {
    setOutput(hexToUnicode(input));
  }, [input]);

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Input" helper="Enter the hex string" />

        <MyCodeEditor
          language="plaintext"
          placeholder="Enter the hex string"
          value={input}
          onChange={setInput}
        />
      </TwoColumn.Left>
      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="Unicode string">
          <MyCopyButton value={output} type="button" />
        </MyCard.Header>

        <MyCodeEditor
          language="plaintext"
          placeholder="Unicode string"
          value={output}
          options={{ minimap: { enabled: false }, readOnly: true }}
        />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

HexToUnicode.title = "Hex To Unicode";
export default HexToUnicode;
