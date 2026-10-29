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

  const getRandomInt = (max) => {
    if (typeof window !== "undefined" && window.crypto?.getRandomValues) {
      const arr = new Uint32Array(1);
      window.crypto.getRandomValues(arr);
      return arr[0] % max;
    }
    return Math.floor(Math.random() * max);
  };

  const generatePassword = () => {
    let charset = "";
    const uppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowers = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    if (includeUppercase) charset += uppers;
    if (includeLowercase) charset += lowers;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    if (charset === "") {
      setPassword("");
      return;
    }

    const chars = [];
    if (includeUppercase) chars.push(uppers[getRandomInt(uppers.length)]);
    if (includeLowercase) chars.push(lowers[getRandomInt(lowers.length)]);
    if (includeNumbers) chars.push(numbers[getRandomInt(numbers.length)]);
    if (includeSymbols) chars.push(symbols[getRandomInt(symbols.length)]);

    while (chars.length < length) {
      chars.push(charset[getRandomInt(charset.length)]);
    }

    // Fisher-Yates shuffle using CSPRNG
    for (let i = chars.length - 1; i > 0; i--) {
      const j = getRandomInt(i + 1);
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }

    setPassword(chars.slice(0, length).join(""));
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
