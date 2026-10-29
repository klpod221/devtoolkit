import React from "react";

const MyRadio = ({ label, id, ...props }) => {
  const autoId = React.useId();
  const radioId = id || autoId;

  return (
    <div className="flex items-center">
      <input
        type="radio"
        className="border-gray-300 text-blue-500 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        id={radioId}
        {...props}
      />
      <label className="ml-1 mt-0.5" htmlFor={radioId}>
        {label}
      </label>
    </div>
  );
};

export default MyRadio;
