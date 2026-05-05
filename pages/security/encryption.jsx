import React, { useState } from "react";
import CryptoJS from "crypto-js";
import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MyInput from "@components/MyInput";
import MyTextarea from "@components/MyTextarea";
import MySelect from "@components/MySelect";
import CodeOutput from "@components/CodeOutput";

const ALGORITHMS = ["AES", "TripleDES", "Rabbit", "RC4"];

const encryptors = {
  AES: { enc: CryptoJS.AES.encrypt, dec: CryptoJS.AES.decrypt },
  TripleDES: { enc: CryptoJS.TripleDES.encrypt, dec: CryptoJS.TripleDES.decrypt },
  Rabbit: { enc: CryptoJS.Rabbit.encrypt, dec: CryptoJS.Rabbit.decrypt },
  RC4: { enc: CryptoJS.RC4.encrypt, dec: CryptoJS.RC4.decrypt },
};

const EncryptDecryptText = () => {
  const [mode, setMode] = useState("encrypt");
  const [algorithm, setAlgorithm] = useState("AES");
  const [passphrase, setPassphrase] = useState("my-secret-key");
  const [inputText, setInputText] = useState("Hello, DevToolkit!");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleProcess = () => {
    setError("");
    setOutput("");
    try {
      const { enc, dec } = encryptors[algorithm];
      if (mode === "encrypt") {
        const result = enc(inputText, passphrase);
        setOutput(result.toString());
      } else {
        const bytes = dec(inputText, passphrase);
        const result = bytes.toString(CryptoJS.enc.Utf8);
        if (!result) throw new Error("Decryption failed. Check your key and ciphertext.");
        setOutput(result);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Encrypt / Decrypt Text" helper="Symmetric encryption using popular algorithms" />
        <div className="space-y-4 mt-4">
          <MySelect label="Mode" value={mode} onChange={(val) => setMode(val)}>
            <option value="encrypt">Encrypt</option>
            <option value="decrypt">Decrypt</option>
          </MySelect>
          <MySelect label="Algorithm" value={algorithm} onChange={(val) => setAlgorithm(val)}>
            {ALGORITHMS.map((a) => <option key={a} value={a}>{a}</option>)}
          </MySelect>
          <MyInput
            label="Passphrase / Secret Key"
            value={passphrase}
            onChange={(val) => setPassphrase(val)}
            placeholder="Enter secret key"
            type="password"
          />
          <MyTextarea
            label={mode === "encrypt" ? "Plaintext" : "Ciphertext"}
            value={inputText}
            onChange={(val) => setInputText(val)}
            placeholder={mode === "encrypt" ? "Text to encrypt..." : "Ciphertext to decrypt..."}
            rows={5}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <MyButton onClick={handleProcess} className="w-full">
            {mode === "encrypt" ? "🔒 Encrypt" : "🔓 Decrypt"}
          </MyButton>
        </div>
      </TwoColumn.Left>

      <TwoColumn.Right>
        <MyCard.Header title="Output" helper={mode === "encrypt" ? "Encrypted ciphertext" : "Decrypted plaintext"} />
        <CodeOutput output={output} language="text" />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

EncryptDecryptText.title = "Encrypt/Decrypt Text";
export default EncryptDecryptText;
