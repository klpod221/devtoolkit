import React from "react";

import MyCopyButton from "./MyCopyButton";

const MyTextarea = ({
  showCopy = true,
  value,
  onChange = () => {},
  label,
  labelStyle,
  rows = 4,
  className,
  error = "",
  ...props
}) => {
  const onTextChange = (e) => {
    onChange(e.target.value, e);
  };

  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={props.id} className={`text-base flex items-center ${labelStyle}`}>
          {label}
        </label>
      )}

      <div className="relative group overflow-auto">
        {showCopy && value && (
          <MyCopyButton
            value={value}
            type="absolute"
            className="hidden group-hover:block"
          />
        )}

        <textarea
          className={`block w-full border text-sm disabled:cursor-not-allowed disabled:opacity-50 border-gray-200 bg-gray-50 focus:border-cyan-500 focus:ring-cyan-500 dark:border-dark-secondary dark:bg-dark dark:placeholder-dark-text-secondary dark:focus:border-dark-secondary dark:focus:text-dark-text ${error ? "border-red-500" : ""} ${className}`}
          rows={rows}
          value={value}
          onChange={onTextChange}
          {...props}
        />

        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>
    </div>
  );
};

export default MyTextarea;
