import React, { useState, useEffect } from "react";
import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MyCheckbox from "@components/MyCheckbox";
import MyRangeSlider from "@components/MyRangeSlider";
import CodeOutput from "@components/CodeOutput";
import { FaSyncAlt } from "react-icons/fa";

const PasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");

  const generatePassword = () => {
    let charset = "";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (charset === "") {
      setPassword("");
      return;
    }

    let newPassword = "";
    if (includeUppercase) newPassword += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
    if (includeLowercase) newPassword += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)];
    if (includeNumbers) newPassword += "0123456789"[Math.floor(Math.random() * 10)];
    if (includeSymbols) newPassword += "!@#$%^&*()_+~`|}{[]:;?><,./-="[Math.floor(Math.random() * 29)];

    for (let i = newPassword.length; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    
    newPassword = newPassword.split('').sort(() => 0.5 - Math.random()).join('');
    newPassword = newPassword.substring(0, length);

    setPassword(newPassword);
  };

  useEffect(() => {
    generatePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  return (
    <TwoColumn leftWidth="40">
      <TwoColumn.Left>
        <MyCard.Header
          title="Configuration"
          helper="Select the options for your generated password."
        >
          <MyButton onClick={generatePassword}>
            <FaSyncAlt className="mr-2" /> Regenerate
          </MyButton>
        </MyCard.Header>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password Length: {length}
          </label>
          <MyRangeSlider
            min={4}
            max={64}
            value={length}
            onChange={(val) => setLength(val)}
          />
        </div>

        <div className="space-y-3">
          <MyCheckbox
            label="Include Uppercase Letters (A-Z)"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
          />
          <MyCheckbox
            label="Include Lowercase Letters (a-z)"
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
          />
          <MyCheckbox
            label="Include Numbers (0-9)"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          <MyCheckbox
            label="Include Symbols (!@#$)"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
        </div>
        
        {(!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) && (
            <p className="text-red-500 text-sm mt-4">Please select at least one character set.</p>
        )}
      </TwoColumn.Left>

      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="Your generated password." />
        <CodeOutput output={password} />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

PasswordGenerator.title = "Password Generator";
export default PasswordGenerator;
