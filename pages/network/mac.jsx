import React, { useState, useEffect } from "react";
import MyCard from "@components/MyCard";
import MyButton from "@components/MyButton";
import MyCheckbox from "@components/MyCheckbox";
import MyCopyButton from "@components/MyCopyButton";
import ObjectOutput from "@components/ObjectOutput";
import { generateMacAddress } from "@utils/systemUtils";
import { FaArrowRight } from "react-icons/fa";

const MacAddressGenerator = () => {
  const [isUnicast, setIsUnicast] = useState(true);
  const [mac, setMac] = useState("");

  const handleGenerate = () => {
    setMac(generateMacAddress(isUnicast));
  };

  useEffect(() => {
    handleGenerate();
  }, [isUnicast]);

  return (
    <div className="flex flex-col items-center">
      <MyCard className="w-full max-w-2xl">
        <MyCard.Header 
          title="MAC Address Generator" 
          helper="Generate random MAC addresses for networking and testing."
        >
          <MyButton onClick={handleGenerate}>
            Generate <FaArrowRight className="ml-2" />
          </MyButton>
        </MyCard.Header>

        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-200 dark:border-dark-secondary">
            <span className="text-sm uppercase tracking-widest text-gray-500 mb-2">Generated MAC</span>
            <div className="flex items-center space-x-4">
              <span className="text-4xl md:text-5xl font-bold text-green-600 dark:text-green-400 font-mono break-all text-center">
                {mac}
              </span>
              <MyCopyButton value={mac} />
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <MyCheckbox
              label="Unicast address (Locally Administered)"
              checked={isUnicast}
              onChange={(e) => setIsUnicast(e.target.checked)}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 italic">
              Locally administered addresses are safe for private networks and not globally unique.
            </p>
          </div>

          <hr className="border-gray-200 dark:border-dark-secondary" />

          <MyCard.Header title="Details" />
          <ObjectOutput 
            data={{
              "Type": isUnicast ? "Unicast (Local)" : "Multicast/Global",
              "Standard": "IEEE 802 (48-bit)",
              "Notation": "Hexadecimal (Colon-separated)"
            }} 
          />
        </div>
      </MyCard>
    </div>
  );
};

MacAddressGenerator.title = "MAC Address Generator";
export default MacAddressGenerator;
