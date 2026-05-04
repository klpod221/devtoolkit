import React, { useState, useEffect } from "react";
import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyInput from "@components/MyInput";
import ObjectOutput from "@components/ObjectOutput";
import { ipToInt, ipToBinary, ipToHex, isValidIpv4 } from "@utils/networkUtils";

const Ipv4Converter = () => {
  const [ip, setIp] = useState("192.168.1.1");
  const [results, setResults] = useState({
    decimal: "",
    binary: "",
    hex: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (isValidIpv4(ip)) {
      setError("");
      setResults({
        decimal: ipToInt(ip).toString(),
        binary: ipToBinary(ip),
        hex: "0x" + ipToHex(ip),
      });
    } else {
      setError("Invalid IPv4 address");
    }
  }, [ip]);

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Input" helper="Enter IPv4 address in dotted-decimal format" />
        
        <MyInput
          label="IPv4 Address"
          value={ip}
          onChange={setIp}
          placeholder="e.g. 127.0.0.1"
          helperText={error && <span className="text-red-500">{error}</span>}
        />
      </TwoColumn.Left>
      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="Converted address formats" />

        <ObjectOutput 
          data={{
            "Dotted Decimal": ip,
            "Decimal (Integer)": results.decimal,
            "Binary Representation": results.binary,
            "Hexadecimal": results.hex
          }} 
        />

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-xs text-gray-500 border border-gray-200 dark:border-dark-secondary">
          <h6 className="font-bold mb-1 text-gray-700 dark:text-gray-300 uppercase">IPv4 Info:</h6>
          <p>32-bit address space (approx. 4.3 billion addresses). Divided into 4 octets of 8 bits each.</p>
        </div>
      </TwoColumn.Right>
    </TwoColumn>
  );
};

Ipv4Converter.title = "IPv4 Address Converter";
export default Ipv4Converter;
