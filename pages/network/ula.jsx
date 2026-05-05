import React, { useState } from "react";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import ObjectOutput from "@components/ObjectOutput";

const generateRandomULA = () => {
  const hex = "0123456789abcdef";
  let random40bits = "";
  for (let i = 0; i < 10; i++) {
    random40bits += hex[Math.floor(Math.random() * 16)];
  }
  const part1 = random40bits.substring(0, 2);
  const part2 = random40bits.substring(2, 6);
  const part3 = random40bits.substring(6, 10);
  
  const prefix = `fd${part1}:${part2}:${part3}::/48`;
  const firstSubnet = `fd${part1}:${part2}:${part3}:0000::/64`;
  return { prefix, firstSubnet };
};

const IPv6ULAGenerator = () => {
  const [result, setResult] = useState(null);

  const handleGenerate = () => {
    setResult(generateRandomULA());
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <MyCard className="w-full max-w-4xl mx-auto">
        <MyCard.Header title="IPv6 ULA Generator" helper="Generate a random Unique Local Address (ULA) /48 prefix" />
        <div className="mt-4 space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Unique Local Addresses (ULA) are IPv6 addresses that are usable within a site or group of sites.
            They are not routable on the global Internet.
          </p>
          <MyButton onClick={handleGenerate} className="w-full">
            Generate Random ULA
          </MyButton>
        </div>
      </MyCard>

      {result && (
        <MyCard className="w-full max-w-4xl mx-auto">
          <MyCard.Header title="Result" helper="Your random ULA Prefix" />
          <div className="mt-4">
            <ObjectOutput data={{
              "Global ID": result.prefix.split("::")[0].replace("fd", ""),
              "ULA Prefix (/48)": result.prefix,
              "First Subnet (/64)": result.firstSubnet
            }} beautifyKey={false} />
          </div>
        </MyCard>
      )}
    </div>
  );
};

IPv6ULAGenerator.title = "IPv6 ULA Generator";
export default IPv6ULAGenerator;
