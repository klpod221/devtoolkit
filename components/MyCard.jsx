import React from "react";
import { Card } from "flowbite-react";

const Header = ({ children, title, helper }) => {
  return (
    <div className="flex flex-col space-x-0 space-y-2 md:items-center md:space-x-4 md:justify-between md:flex-row">
      {title || helper ? (
        <div className="text-xl font-semibold">
          {title}
          <p className="text-xs text-gray-400 dark:text-dark-text-secondary italic font-light">
            <span dangerouslySetInnerHTML={{ __html: helper }} />
          </p>
        </div>
      ) : null}

      <div className="flex space-x-2 items-center justify-center">
        {children}
      </div>
    </div>
  );
};

const MyCard = ({ children, ...props }) => {
  const theme = {
    root: {
      base: "flex rounded-lg border border-gray-200 bg-white dark:border-dark-secondary dark:bg-dark",
      children: "flex h-full flex-col p-6 space-y-4",
      horizontal: {
        off: "flex-col",
        on: "flex-col md:max-w-xl md:flex-row",
      },
      href: "hover:bg-gray-100 dark:hover:bg-gray-700",
    },
    img: {
      base: "",
      horizontal: {
        off: "rounded-t-lg",
        on: "h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg",
      },
    },
  };

  return (
    <Card theme={theme} {...props}>
      {children}
    </Card>
  );
};

MyCard.Header = Header;
export default MyCard;
