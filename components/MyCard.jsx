import React from "react";

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

const MyCard = ({ children, className, ...props }) => {
  return (
    <div
      className={`flex rounded-lg border border-gray-200 bg-white dark:border-dark-secondary dark:bg-dark flex-col mb-4 sm:mb-0 w-full max-h-screen ${className}`}
      {...props}
    >
      <div className="flex h-full flex-col p-6 space-y-4 overflow-y-auto">{children}</div>
    </div>
  );
};

MyCard.Header = Header;
export default MyCard;
