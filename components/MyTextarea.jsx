import React from "react";
import { Label, Textarea } from "flowbite-react";
import { AiOutlineCopy } from "react-icons/ai";

import copyToClipboard from "@utils/copyToClipboard";

const MyTextarea = ({
  showCopy = true,
  value,
  onChange = () => {},
  label,
  labelStyle,
  ...props
}) => {
  const onTextChange = (e) => {
    onChange(e.target.value, e);
  };

  const theme = {
    base: "block w-full rounded-lg border text-sm disabled:cursor-not-allowed disabled:opacity-50",
    colors: {
      gray: "border-gray-200 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-dark-secondary dark:bg-dark dark:text-dark-text dark:placeholder-dark-text-secondary dark:focus:border-dark-secondary dark:focus:text-dark-text",
      info: "border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-dark-secondary dark:bg-dark",
      failure:
        "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500",
      warning:
        "border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500",
      success:
        "border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500",
    },
    withShadow: {
      on: "shadow-sm dark:shadow-sm-light",
      off: "",
    },
  };

  return (
    <div className="flex flex-col">
      {label && (
        <Label
          htmlFor={props.id}
          value={label}
          className={`text-base dark:text-dark-text ${labelStyle}`}
        />
      )}

      <div className="relative group overflow-auto">
        {showCopy && value && (
          <button
            className="absolute top-1 right-1 p-1 bg-gray-200 dark:bg-dark-secondary rounded-md group-hover:block hidden"
            onClick={() => copyToClipboard(value)}
          >
            <AiOutlineCopy />
          </button>
        )}

        <Textarea
          theme={theme}
          rows={props.rows || 4}
          value={value}
          onChange={onTextChange}
          {...props}
        />
      </div>
    </div>
  );
};

export default MyTextarea;
