import React, { useState } from "react";
import { Address4 } from "ip-address";
import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyInput from "@components/MyInput";
import MyButton from "@components/MyButton";
import CodeOutput from "@components/CodeOutput";

const ipToInt = (ip) => ip.split('.').reduce((acc, octet) => (acc << 8n) + BigInt(octet), 0n);
const intToIp = (int) => [
  Number((int >> 24n) & 255n),
  Number((int >> 16n) & 255n),
  Number((int >> 8n) & 255n),
  Number(int & 255n)
].join('.');

const IPv4RangeExpander = () => {
  const [input, setInput] = useState("192.168.1.0/29");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleExpand = () => {
    setError("");
    setOutput("");
    try {
      let startIp, endIp;
      
      if (input.includes("/")) {
        const address = new Address4(input);
        startIp = address.startAddress().address;
        endIp = address.endAddress().address;
      } else if (input.includes("-")) {
        const parts = input.split("-").map(p => p.trim());
        if (parts.length !== 2) throw new Error("Invalid range format");
        const a1 = new Address4(parts[0]);
        const a2 = new Address4(parts[1]);
        startIp = a1.address;
        endIp = a2.address;
      } else {
        throw new Error("Input must be CIDR (e.g. 192.168.1.0/24) or Range (e.g. 192.168.1.0 - 192.168.1.255)");
      }
      
      const startInt = ipToInt(startIp);
      const endInt = ipToInt(endIp);
      
      if (startInt > endInt) throw new Error("Start IP must be less than or equal to End IP");
      if (endInt - startInt > 100000n) throw new Error("Range too large (max 100,000 IPs)");
      
      const ips = [];
      for (let i = startInt; i <= endInt; i++) {
        ips.push(intToIp(i));
      }
      setOutput(ips.join("\n"));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Input" helper="Enter CIDR or IP Range" />
        <div className="space-y-4 mt-4">
          <MyInput 
            label="CIDR or Range" 
            placeholder="192.168.1.0/29 or 10.0.0.1 - 10.0.0.10" 
            value={input} 
            onChange={(val) => setInput(val)} 
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <MyButton onClick={handleExpand} className="w-full">Expand Range</MyButton>
        </div>
      </TwoColumn.Left>

      <TwoColumn.Right>
        <MyCard.Header title="Output" helper={`Generated ${output ? output.split('\n').length : 0} IPs`} />
        <CodeOutput output={output} language="text" />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

IPv4RangeExpander.title = "IPv4 Range Expander";
export default IPv4RangeExpander;
