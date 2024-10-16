import React from "react";

import objectKeyToHumanReadable from "@utils/objectKeyToHumanReadable";

import MyCopyButton from "./MyCopyButton";

const ObjectOutput = ({ object, keyType = "capitalize" }) => {
  return (
    <>
      {object && typeof object === "object" && (
        <div className="flex flex-col border border-gray-300 dark:border-dark-secondary  rounded-md">
          {Object.entries(object).map(([key, value]) => (
            <div
              key={key}
              className="flex flex-col px-3 pt-5 pb-3 border-b border-gray-300/50 dark:border-dark-secondary/50 last:border-b-0"
            >
              <span
                className={`text-xs text-gray-400 bg-white dark:bg-dark dark:text-dark-text-secondary rounded-md px-1 -ml-1 w-fit -mt-[29px] ${keyType === "capitalize" ? "capitalize" : ""}`}
              >
                {objectKeyToHumanReadable(key)}
              </span>
              <span className="flex items-center pt-1 break-all whitespace-pre-wrap justify-between">
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
