import React, { useState, useEffect } from "react";
import { Address4 } from "ip-address";
import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyInput from "@components/MyInput";
import MySelect from "@components/MySelect";
import ObjectOutput from "@components/ObjectOutput";

const cidrOptions = Array.from({ length: 32 }, (_, i) => 32 - i).map(c => ({
  value: c,
  label: `/${c}`
}));

const IPv4SubnetCalculator = () => {
  const [ip, setIp] = useState("192.168.1.1");
  const [cidr, setCidr] = useState("24");
  const [result, setResult] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      setError("");
      const address = new Address4(`${ip}/${cidr}`);
      
      const parsedCidr = parseInt(cidr);
      const startAddrObj = address.startAddress();
      const endAddrObj = address.endAddress();
      
      const startAddrStr = startAddrObj.address;
      const endAddrStr = endAddrObj.address;

      const numHosts = Math.pow(2, 32 - parsedCidr) - 2;
      const validNumHosts = numHosts < 0 ? 0 : numHosts;
      
      let hostRange = "N/A";
      if (parsedCidr === 32) {
        hostRange = startAddrStr;
      } else if (parsedCidr === 31) {
        hostRange = `${startAddrStr} - ${endAddrStr}`;
      } else {
        const startParts = startAddrStr.split('.').map(Number);
        startParts[3]++;
        if (startParts[3] > 255) { startParts[3] = 0; startParts[2]++; }
        if (startParts[2] > 255) { startParts[2] = 0; startParts[1]++; }
        if (startParts[1] > 255) { startParts[1] = 0; startParts[0]++; }
        
        const endParts = endAddrStr.split('.').map(Number);
        endParts[3]--;
        if (endParts[3] < 0) { endParts[3] = 255; endParts[2]--; }
        if (endParts[2] < 0) { endParts[2] = 255; endParts[1]--; }
        if (endParts[1] < 0) { endParts[1] = 255; endParts[0]--; }
        
        hostRange = `${startParts.join('.')} - ${endParts.join('.')}`;
      }

      setResult({
        "IP Address": address.addressMinusSuffix,
        "Network Address": startAddrStr,
        "Usable Host Range": hostRange,
        "Broadcast Address": endAddrStr,
        "Total Number of Hosts": validNumHosts + (parsedCidr < 31 ? 2 : (parsedCidr === 31 ? 2 : 1)),
        "Number of Usable Hosts": validNumHosts,
        "Subnet Mask": address.subnetMask,
      });

    } catch (err) {
      setError("Invalid IPv4 address format.");
      setResult({});
    }
  }, [ip, cidr]);

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Subnet Configuration" helper="Enter an IPv4 address and select a subnet mask" />
        <div className="space-y-4 mt-4">
          <MyInput 
            label="IPv4 Address" 
            placeholder="e.g. 192.168.1.1" 
            value={ip} 
            onChange={(val) => setIp(val)} 
          />
          <MySelect 
            label="Subnet Mask (CIDR)" 
            value={cidr} 
            onChange={(val) => setCidr(val)}
          >
            {cidrOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </MySelect>
        </div>
      </TwoColumn.Left>

      <TwoColumn.Right>
        <MyCard.Header title="Result" helper="Calculated subnet details" />
        {error ? (
          <p className="text-red-500 mt-4">{error}</p>
        ) : (
          <div className="mt-4">
            <ObjectOutput data={result} beautifyKey={false} />
          </div>
        )}
      </TwoColumn.Right>
    </TwoColumn>
  );
};

IPv4SubnetCalculator.title = "IPv4 Subnet Calculator";
export default IPv4SubnetCalculator;
