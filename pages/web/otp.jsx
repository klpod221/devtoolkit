import React from "react";

import MyCard from "@components/MyCard";
import MyInput from "@components/MyInput";
import MyButton from "@components/MyButton";

const OTPCodeGenerator = () => {
  return (
    <MyCard className="w-full max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <MyInput
            label="Secret"
            placeholder="Enter Secret"
          />

          <div className="flex">
            <MyInput
              label="Previous"
              readOnly
            />
            <MyInput
              label="Current"
              readOnly
            />
            <MyInput
              label="Next"
              readOnly
            />
          </div>

          <MyButton>
            Generate OTP
          </MyButton>
        </div>
        <div>
          <MyInput
            label="Secret in hexadecimal"
            readOnly
          />
        </div>
      </div>
    </MyCard>
  );
};

OTPCodeGenerator.title = "OTP Code Generator";
export default OTPCodeGenerator;
