import React from "react";

import MyCard from "@components/MyCard";
import MyInput from "@components/MyInput";

import { AiOutlineSearch } from "react-icons/ai";

const OTPCodeGenerator = () => {
  return (
    <MyCard className="w-full max-w-5xl">
      <MyInput
        helper="Enter the length of the OTP code you want to generate"
        icon={AiOutlineSearch}
        action={
          <>
            <button className="btn">Generate</button>
          </>
        }
      />
    </MyCard>
  );
};

OTPCodeGenerator.title = "OTP Code Generator";
export default OTPCodeGenerator;
