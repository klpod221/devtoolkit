import React, { useState } from "react";
import bcrypt from "bcryptjs";
import CryptoJS from "crypto-js";
import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyInput from "@components/MyInput";
import MySelect from "@components/MySelect";
import MyButton from "@components/MyButton";
import CodeOutput from "@components/CodeOutput";

const PasswordHashGenerator = () => {
  const [password, setPassword] = useState("DEVTOOLKIT");
  const [algorithm, setAlgorithm] = useState("bcrypt");
  const [rounds, setRounds] = useState(10);
  const [output, setOutput] = useState("");
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    if (!password) {
      setOutput("");
      return;
    }
    setGenerating(true);
    
    setTimeout(() => {
      try {
        let hash = "";
        if (algorithm === "bcrypt") {
          const salt = bcrypt.genSaltSync(parseInt(rounds) || 10);
          hash = bcrypt.hashSync(password, salt);
        } else if (algorithm === "MD5") {
          hash = CryptoJS.MD5(password).toString();
        } else if (algorithm === "SHA1") {
          hash = CryptoJS.SHA1(password).toString();
        } else if (algorithm === "SHA256") {
          hash = CryptoJS.SHA256(password).toString();
        } else if (algorithm === "SHA512") {
          hash = CryptoJS.SHA512(password).toString();
        }
        setOutput(hash);
      } catch (err) {
        setOutput("Error generating hash");
      }
      setGenerating(false);
    }, 10);
  };

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Password Hash Generator" helper="Generate secure password hashes" />
        <div className="space-y-4 mt-4">
          <MyInput
            label="Password"
            value={password}
            onChange={(val) => setPassword(val)}
            placeholder="Enter password to hash"
            type="text"
          />
          <MySelect
            label="Algorithm"
            value={algorithm}
            onChange={(val) => setAlgorithm(val)}
          >
            <option value="bcrypt">Bcrypt</option>
            <option value="MD5">MD5</option>
            <option value="SHA1">SHA1</option>
            <option value="SHA256">SHA256</option>
            <option value="SHA512">SHA512</option>
          </MySelect>
          {algorithm === "bcrypt" && (
            <MyInput
              label="Rounds (Cost)"
              type="number"
              value={rounds}
              onChange={(val) => setRounds(val)}
              min="4"
              max="20"
            />
          )}
          <MyButton onClick={handleGenerate} className="w-full" loading={generating}>
            Generate Hash
          </MyButton>
        </div>
      </TwoColumn.Left>

      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="Generated password hash" />
        <CodeOutput output={output} language="text" />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

PasswordHashGenerator.title = "Password Hash Generator";
export default PasswordHashGenerator;
