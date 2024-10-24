import React from "react";

const Tab = (props) => {
  return <div>{props.children}</div>;
};

const MyTabs = (props) => {
  const [activeTab, setActiveTab] = React.useState(0);
  let tabs = [];

  React.Children.forEach(props.children, (child) => {
    if (!React.isValidElement(child)) return;

    if (child.type === Tab) {
      tabs.push(child);
    }
  });

  return (
    <div className="w-full">
      <ul className="flex space-x-1 overflow-x-auto">
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={`cursor-pointer px-4 py-2 hover:bg-white dark:hover:bg-dark dark:hover:text-dark-text rounded-t-lg transition-all duration-300 border border-gray-200 dark:border-dark whitespace-nowrap
            ${
              activeTab === index
                ? "bg-white dark:bg-dark border-none"
                : "bg-gray-100 dark:bg-dark-secondary"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.props.title}
          </li>
        ))}
      </ul>

      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`rounded-b-lg bg-white dark:bg-dark p-4 ${
            activeTab === index ? "block" : "hidden"
          }`}
        >
          {tab.props.children}
        </div>
      ))}
    </div>
  );
};

MyTabs.Tab = Tab;
export default MyTabs;
