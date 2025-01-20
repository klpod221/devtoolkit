import React from "react";
import { ToggleSwitch } from "flowbite-react";

const MySwitch = ({ label, checked, onChange, sizing = "md" }) => {
  const [labelStyle, setLabelStyle] = React.useState("");

  React.useEffect(() => {
    if (sizing === "sm") {
      setLabelStyle("text-sm");
    } else if (sizing === "lg") {
      setLabelStyle("text-lg");
    } else {
      setLabelStyle("text-base");
    }
  }, [sizing]);

  return (
    <div className="flex items-center">
      {label && (
        <label className={`mr-2 leading-none ${labelStyle}`}>
          {label}
        </label>
      )}
      <ToggleSwitch sizing={sizing} checked={checked} onChange={onChange} />
    </div>
  );
};

export default MySwitch;
