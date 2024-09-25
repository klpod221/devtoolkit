import React from "react";

import MyCopyButton from "./MyCopyButton";

const ObjectOutput = ({ object, keyType = "capitalize" }) => {
  return (
    <>
      {object && (typeof object === "object") && (
        <div className="flex flex-col border border-gray-300 dark:border-dark-secondary  rounded-md">
          {Object.entries(object).map(([key, value]) => (
            <div
              key={key}
              className="flex flex-col  p-4 border-b border-gray-300/50 dark:border-dark-secondary/50 last:border-b-0"
            >
              <span className={`font-semibold ${keyType}`}>{key}</span>
              <span
                className="text-sm flex items-center break-all whitespace-pre-wrap justify-between"
              >
                {value}
                {value && <MyCopyButton value={value} className="ml-2" />}
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ObjectOutput;
