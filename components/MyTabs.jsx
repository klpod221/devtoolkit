import React from "react";

const Tab = (props) => {
  return <div>{props.children}</div>;
};

const MyTabs = (props) => {
  const [activeTab, setActiveTab] = React.useState(0);
  let tabs = [];

  React.Children.forEach(props.children, (child) => {
    if (!React.isValidElement(child)) return;
    if (child.type === Tab) tabs.push(child);
  });

  return (
    <div className="w-full">
      {/* Tab bar */}
      <div className="flex items-center gap-1 border-b border-gray-200 dark:border-gray-700 mb-3">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`relative px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 rounded-t-md focus:outline-none
              ${activeTab === index
                ? "text-primary dark:text-primary"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
          >
            {tab.props.title}
            {/* Active indicator */}
            {activeTab === index && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={activeTab === index ? "block" : "hidden"}
        >
          {tab.props.children}
        </div>
      ))}
    </div>
  );
};

MyTabs.Tab = Tab;
export default MyTabs;
