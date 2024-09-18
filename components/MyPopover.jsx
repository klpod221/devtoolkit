import React from "react";
import { Popover } from "flowbite-react";

const MyPopover = ({ children, ...props }) => {
  const theme = {
    base: "absolute z-20 inline-block w-max max-w-[100vw] bg-white outline-none border border-gray-200 rounded-lg shadow-sm dark:border-dark-secondary dark:bg-dark",
    content: "z-10 overflow-hidden rounded-[7px]",
    arrow: {
      base: "absolute h-2 w-2 z-0 rotate-45 mix-blend-lighten bg-white border border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:mix-blend-color",
      placement: "-4px",
    },
  };

  return (
    <Popover theme={theme} {...props}>
      {children}
    </Popover>
  );
};

export default MyPopover;
