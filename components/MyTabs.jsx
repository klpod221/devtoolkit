import React from "react";
import MyTab from "./MyTab";

const MyTabs = (props) => {
  const [activeTab, setActiveTab] = React.useState(0);
  let tabs = [];

  React.Children.forEach(props.children, (child) => {
    if (!React.isValidElement(child)) return;

    if (child.type === MyTab) {
      tabs.push(child);
    }
  });

  return (
    <div className="w-full">
      <div className="flex space-x-1 overflow-x-auto">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`cursor-pointer px-4 py-2 hover:bg-white dark:hover:bg-dark dark:hover:text-dark-text rounded-t-lg transition-all duration-300 border border-gray-200 dark:border-dark-secondary border-b-0
            ${
              activeTab === index
                ? "bg-white dark:bg-dark dark:text-dark-text"
                : "bg-gray-100 dark:bg-dark-secondary dark:text-dark-text"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.props.title}
          </div>
        ))}
      </div>

      <div className="border border-gray-200 dark:border-dark-secondary rounded-b-lg bg-white dark:bg-dark p-4">
        {tabs[activeTab] && tabs[activeTab].props.children}
      </div>
    </div>
  );
};

export default MyTabs;
