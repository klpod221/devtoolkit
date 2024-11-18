import React from "react";

import bcryptGenerator from "@utils/bcryptGenerator";

import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MySelect from "@components/MySelect";
import MyTextarea from "@components/MyTextarea";
import MyInput from "@components/MyInput";

import {
  AiOutlineLock,
  AiOutlineUnlock,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";
import { toast } from "react-toastify";

const BcryptHashGenerator = () => {
  const [salt, setSalt] = React.useState(10);
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");

  const [hash, setHash] = React.useState("");
  const [stringToCheck, setStringToCheck] = React.useState("");
  const [isMatched, setIsMatched] = React.useState(false);
  const [isShowResult, setIsShowResult] = React.useState(false);

  const textToHash = async () => {
    try {
      if (!input.trim()) {
        toast.error("Please enter some text to encrypt");
        return;
      }

      const hashed = await toast.promise(bcryptGenerator(input, salt), {
        pending: "Encrypting...",
        success: "Encrypted successfully",
        error: "Error encrypting",
      });

      setOutput(hashed);
    } catch (error) {
      toast.error(error.message || "Error encrypting");
      console.error(error);
    }
  };

  const hashChecker = async () => {
    try {
      setIsShowResult(false);

      if (!hash.trim() || !stringToCheck.trim()) {
        toast.error("Please enter both hash and string to check");
        return;
      }

      const matched = await toast.promise(bcrypt.compare(stringToCheck, hash), {
        pending: "Checking...",
        success: "Compared successfully",
        error: "Error checking hash",
      });

      setIsMatched(matched);
      setIsShowResult(true);
    } catch (error) {
      toast.error(error.message || "Error checking hash");
      console.error(error);
    }
  };

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header
          title="Encrypt"
          helper="Encrypt some text. The result shown will be a Bcrypt encrypted hash."
        >
          <MyButton onClick={textToHash}>
            <AiOutlineLock className="w-5 h-5 mr-2" />
            Encrypt
          </MyButton>
        </MyCard.Header>

        <MyInput
          id="text"
          label="Text Input"
          value={input}
          onChange={setInput}
          placeholder="Enter text to encrypt"
        />

        <MySelect
          label="Salt Rounds"
          value={salt}
          onChange={setSalt}
          className="min-w-[65px]"
          sizing="md"
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </MySelect>

        <MyTextarea
          id="output"
          label="Output"
          value={output}
          rows={4}
          readOnly
          placeholder="Output will be shown here"
        />
      </TwoColumn.Left>

      <TwoColumn.Right>
        <MyCard.Header
          title="Decrypt"
          helper="Test your Bcrypt hash against some plaintext, to see if they match."
        >
          <MyButton onClick={hashChecker}>
            <AiOutlineUnlock className="w-5 h-5 mr-2" />
            Check
          </MyButton>
        </MyCard.Header>

        <MyInput
          id="hash"
          label="Hash to check"
          placeholder="Enter hash to check"
          value={hash}
          onChange={setHash}
        />

        <MyInput
          id="stringToCheck"
          label="String to check"
          placeholder="Enter string to check"
          value={stringToCheck}
          onChange={setStringToCheck}
        />

        {isShowResult && (
          <div
            className={`text-lg font-semibold flex items-center ${
              isMatched ? "text-green-500" : "text-red-500 dark:text-red-400"
            }`}
          >
            {isMatched ? (
              <>
                <AiOutlineCheck className="w-5 h-5 mr-2" />
                Matched
              </>
            ) : (
              <>
                <AiOutlineClose className="w-5 h-5 mr-2" />
                Not Matched
              </>
            )}
          </div>
        )}
      </TwoColumn.Right>
    </TwoColumn>
  );
};

BcryptHashGenerator.title = "Bcrypt Generator";
export default BcryptHashGenerator;
