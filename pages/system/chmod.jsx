import React, { useState, useEffect } from "react";
import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MyCheckbox from "@components/MyCheckbox";
import MyInput from "@components/MyInput";
import ObjectOutput from "@components/ObjectOutput";
import { calculateChmod, octalToSymbolic } from "@utils/systemUtils";

const ChmodCalculator = () => {
  const [permissions, setPermissions] = useState({
    owner: { read: true, write: true, execute: true },
    group: { read: true, write: false, execute: true },
    others: { read: true, write: false, execute: true },
  });

  const [octal, setOctal] = useState("755");
  const [symbolic, setSymbolic] = useState("rwxr-xr-x");

  useEffect(() => {
    const newOctal = calculateChmod(permissions);
    setOctal(newOctal);
    setSymbolic(octalToSymbolic(newOctal));
  }, [permissions]);

  const handleCheckboxChange = (role, type) => (e) => {
    setPermissions((prev) => ({
      ...prev,
      [role]: {
        ...prev[role],
        [type]: e.target.checked,
      },
    }));
  };

  const handleOctalChange = (val) => {
    const cleaned = val.replace(/[^0-7]/g, "").slice(0, 3);
    setOctal(cleaned);
    if (cleaned.length === 3) {
      const newPermissions = {
        owner: {
          read: (parseInt(cleaned[0]) & 4) !== 0,
          write: (parseInt(cleaned[0]) & 2) !== 0,
          execute: (parseInt(cleaned[0]) & 1) !== 0,
        },
        group: {
          read: (parseInt(cleaned[1]) & 4) !== 0,
          write: (parseInt(cleaned[1]) & 2) !== 0,
          execute: (parseInt(cleaned[1]) & 1) !== 0,
        },
        others: {
          read: (parseInt(cleaned[2]) & 4) !== 0,
          write: (parseInt(cleaned[2]) & 2) !== 0,
          execute: (parseInt(cleaned[2]) & 1) !== 0,
        },
      };
      setPermissions(newPermissions);
      setSymbolic(octalToSymbolic(cleaned));
    }
  };

  const PermissionGroup = ({ label, role }) => (
    <div className="mb-6">
      <label className="block text-sm font-bold mb-3 text-gray-700 dark:text-gray-300 uppercase tracking-wider">{label}</label>
      <div className="flex space-x-6">
        <MyCheckbox
          label="Read"
          checked={permissions[role].read}
          onChange={handleCheckboxChange(role, "read")}
        />
        <MyCheckbox
          label="Write"
          checked={permissions[role].write}
          onChange={handleCheckboxChange(role, "write")}
        />
        <MyCheckbox
          label="Execute"
          checked={permissions[role].execute}
          onChange={handleCheckboxChange(role, "execute")}
        />
      </div>
    </div>
  );

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header title="Permissions" helper="Select file permissions for each role" />
        <div className="mt-4">
          <PermissionGroup label="Owner (User)" role="owner" />
          <PermissionGroup label="Group" role="group" />
          <PermissionGroup label="Others (Public)" role="others" />
        </div>

        <MyInput
          label="Octal Value (Manual Edit)"
          value={octal}
          onChange={handleOctalChange}
          maxLength={3}
          placeholder="e.g. 755"
        />
      </TwoColumn.Left>
      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="Calculated values and command" />
        
        <ObjectOutput 
          data={{
            "Octal Notation": octal,
            "Symbolic Notation": symbolic,
            "Linux Command": `chmod ${octal} filename`
          }} 
        />

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm border border-blue-100 dark:border-blue-800">
           <h6 className="font-bold mb-2 text-blue-800 dark:text-blue-300">Quick Guide:</h6>
           <ul className="list-disc list-inside space-y-1 text-blue-700 dark:text-blue-400 text-xs">
              <li>4 = Read (r)</li>
              <li>2 = Write (w)</li>
              <li>1 = Execute (x)</li>
              <li>7 = 4+2+1 (rwx)</li>
              <li>5 = 4+0+1 (r-x)</li>
           </ul>
        </div>
      </TwoColumn.Right>
    </TwoColumn>
  );
};

ChmodCalculator.title = "Chmod Calculator";
export default ChmodCalculator;
