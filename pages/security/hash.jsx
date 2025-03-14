import React from "react";
import {
  MD5,
  RIPEMD160,
  SHA1,
  SHA224,
  SHA256,
  SHA3,
  SHA384,
  SHA512,
  enc,
} from "crypto-js";

import MyCard from "@components/MyCard";
import TwoColumn from "@components/TwoColumn";
import MyCodeEditor from "@components/MyCodeEditor";
import ObjectOutput from "@components/ObjectOutput";
import MySelect from "@components/MySelect";

const algos = {
  MD5,
  SHA1,
  SHA256,
  SHA224,
  SHA512,
  SHA384,
  SHA3,
  RIPEMD160,
};

const digests = [
  {
    label: "Binary (base 2)",
    value: "binary",
  },
  {
    label: "Hexadecimal (base 16)",
    value: "Hex",
  },
  {
    label: "Base64 (base 64)",
    value: "Base64",
  },
  {
    label: "Base64URL (base 64 with URL-safe alphabet)",
    value: "Base64url",
  },
];

const HashText = () => {
  const [text, setText] = React.useState("Hello World!");
  const [encoding, setEncoding] = React.useState("Hex");
  const [hash, setHash] = React.useState({
    MD5: "",
    SHA1: "",
    SHA256: "",
    SHA224: "",
    SHA512: "",
    SHA384: "",
    SHA3: "",
    RIPEMD160: "",
  });

  const handleHash = (text, encoding) => {
    const hash = {};

    Object.keys(algos).forEach((algo) => {
      const hashObj = algos[algo](text);

      // if encoding is binary
      if (encoding === "binary") {
        hash[algo] = hashObj
          .toString(enc.Hex)
          .trim()
          .split("")
          .map((byte) => Number.parseInt(byte, 16).toString(2).padStart(4, "0"))
          .join("");
      } else {
        hash[algo] = hashObj.toString(enc[encoding]).trim();
      }
    });
    setHash(hash);
  };

  React.useEffect(() => {
    handleHash(text, encoding);
  }, [text, encoding]);

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Input" helper="Enter the text to hash" />

        <MyCodeEditor language="plaintext" value={text} onChange={setText} />
      </TwoColumn.Left>

      <TwoColumn.Right>
        <MyCard.Header
          title="Hash"
          helper="The hashed text will be shown here"
        />

        <MySelect
          label="Digest Encoding"
          sizing="md"
          value={encoding}
          onChange={setEncoding}
        >
          {digests.map((enc) => (
            <option key={enc.value} value={enc.value}>
              {enc.label}
            </option>
          ))}
        </MySelect>

        <div className="overflow-y-auto flex flex-col gap-4">
          <ObjectOutput data={hash} beautifyKey={false} />
        </div>
      </TwoColumn.Right>
    </TwoColumn>
  );
};

HashText.title = "Hash Text";
export default HashText;
