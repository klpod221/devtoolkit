import React from "react";
import { ToggleSwitch } from "flowbite-react";

const MySwitch = ({ label, checked, onChange }) => {
  return (
    <div className="flex items-center">
      {label && (
        <label className="mr-2" htmlFor="switch">
          {label}
        </label>
      )}
      <ToggleSwitch checked={checked} onChange={onChange} />
    </div>
  );
};

export default MySwitch;
