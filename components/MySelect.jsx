import React from "react";

const MySelect = ({ onChange = () => {}, value, children, className = "", sizing = "md" }) => {
  const onSelectChange = (e) => {
    onChange(e.target.value, e);
  }

  return (
    <div className="flex">
      <div className="relative w-full">
        <select className={`block w-full border disabled:cursor-not-allowed disabled:opacity-50 border-gray-200 bg-gray-50 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-dark-secondary dark:bg-dark dark:text-white dark:placeholder-dark-text-secondary dark:focus:border-dark-secondary dark:focus:text-dark-text text-sm rounded-lg ${className} ${sizing == 'sm' ? 'p-2 sm:text-xs' : sizing == 'md' ? 'p-2.5 text-sm' : 'p-4 sm:text-base'}`} value={value} onChange={onSelectChange}>
          {children}
        </select>
      </div>
    </div>
  );
};

export default MySelect;
