import React from "react";
import bcrypt from "bcryptjs";
import { Label } from "flowbite-react";

import TwoColumnLayout from "@components/TwoColumnLayout";
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

      const saltRounds = bcrypt.genSaltSync(salt);

      const hashed = await toast.promise(bcrypt.hash(input, saltRounds), {
        pending: "Encrypting...",
        success: "Encrypted successfully",
        error: "Error encrypting",
      });

      setOutput(hashed);
    } catch (error) {
      console.error(error);
      toast.error("Error encrypting");
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
      console.error(error);
      toast.error("Error checking hash");
    }
  };

  return (
    <TwoColumnLayout>
      <TwoColumnLayout.LeftContent>
        <MyCard.Header
          title="Encrypt"
          helper="Encrypt some text. The result shown will be a Bcrypt encrypted hash."
        >
          <div className="flex justify-center items-center space-x-4 my-2">
            <MySelect
              label="Salt Rounds"
              value={salt}
              onChange={setSalt}
              sizing="sm"
              className="min-w-[65px]"
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </MySelect>

            <MyButton onClick={textToHash} size={"sm"}>
              <AiOutlineLock className="w-5 h-5 mr-2" />
              Encrypt
            </MyButton>
          </div>
        </MyCard.Header>

        <MyInput
          id="text"
          label="Text Input"
          value={input}
          onChange={setInput}
          placeholder="Enter text to encrypt"
        />

        <MyTextarea
          id="output"
          label="Output"
          value={output}
          rows={4}
          readOnly
          placeholder="Output will be shown here"
        />
      </TwoColumnLayout.LeftContent>

      <TwoColumnLayout.RightContent>
        <MyCard.Header
          title="Decrypt"
          helper="Test your Bcrypt hash against some plaintext, to see if they match."
        >
          <MyButton onClick={hashChecker} size="sm">
            <AiOutlineUnlock className="w-5 h-5 mr-2" />
            Decrypt
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
              isMatched ? "text-green-500" : "text-red-500"
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
      </TwoColumnLayout.RightContent>
    </TwoColumnLayout>
  );
};

BcryptHashGenerator.title = "Bcrypt Generator";
export default BcryptHashGenerator;
