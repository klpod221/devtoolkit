import React from "react";

const MyCheckbox = ({ label, id, ...props }) => {
  const autoId = React.useId();
  const checkboxId = id || autoId;

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        className="border-gray-300 rounded text-blue-500 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        id={checkboxId}
        {...props}
      />
      <label className="ml-2" htmlFor={checkboxId}>
        {label}
      </label>
    </div>
  );
};

export default MyCheckbox;
