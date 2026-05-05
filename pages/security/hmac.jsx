import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyInput from "@components/MyInput";
import MyTextarea from "@components/MyTextarea";
import MySelect from "@components/MySelect";
import CodeOutput from "@components/CodeOutput";

const HMACGenerator = () => {
  const [message, setMessage] = useState("DEVTOOLKIT");
  const [secret, setSecret] = useState("secret");
  const [algorithm, setAlgorithm] = useState("SHA256");
  const [output, setOutput] = useState("");

  useEffect(() => {
    try {
      if (!message || !secret) {
        setOutput("");
        return;
      }
      let hash;
      switch (algorithm) {
        case "MD5":
          hash = CryptoJS.HmacMD5(message, secret);
          break;
        case "SHA1":
          hash = CryptoJS.HmacSHA1(message, secret);
          break;
        case "SHA256":
          hash = CryptoJS.HmacSHA256(message, secret);
          break;
        case "SHA512":
          hash = CryptoJS.HmacSHA512(message, secret);
          break;
        default:
          hash = CryptoJS.HmacSHA256(message, secret);
      }
      setOutput(hash.toString(CryptoJS.enc.Hex));
    } catch (e) {
      setOutput("");
    }
  }, [message, secret, algorithm]);

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="HMAC Generator" helper="Generate Hash-based Message Authentication Code" />
        <div className="space-y-4 mt-4">
          <MyTextarea
            label="Message"
            value={message}
            onChange={(val) => setMessage(val)}
            placeholder="Enter the message to hash"
            rows={4}
          />
          <MyInput
            label="Secret Key"
            value={secret}
            onChange={(val) => setSecret(val)}
            placeholder="Enter the secret key"
          />
          <MySelect
            label="Algorithm"
            value={algorithm}
            onChange={(val) => setAlgorithm(val)}
          >
            <option value="MD5">HMAC-MD5</option>
            <option value="SHA1">HMAC-SHA1</option>
            <option value="SHA256">HMAC-SHA256</option>
            <option value="SHA512">HMAC-SHA512</option>
          </MySelect>
        </div>
      </TwoColumn.Left>

      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="Generated HMAC Hex String" />
        <CodeOutput output={output} language="text" />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

HMACGenerator.title = "HMAC Generator";
export default HMACGenerator;
