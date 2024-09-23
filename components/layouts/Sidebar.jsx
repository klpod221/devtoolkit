import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import MyInput from "@/components/MyInput";
import { Popover } from "flowbite-react";

import { AiOutlineSearch } from "react-icons/ai";
import { FaRegCheckCircle } from "react-icons/fa";

import toolList from "@/constants/ToolList";

const MySidebar = ({ isOpen, setIsOpen }) => {
  const router = useRouter();
  const currentPath = router.pathname;

  const [keyword, setKeyword] = React.useState("");
  const [toolkit, setToolkit] = React.useState(toolList);

  React.useEffect(() => {
    const search = keyword.toLowerCase();

    const filteredToolkit = toolList.map((section) => {
      const tools = section.tools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(search) ||
          tool.description.toLowerCase().includes(search)
      );

      return {
        ...section,
        tools,
      };
    });

    setToolkit(filteredToolkit);
  }, [keyword]);

  const popoverContent = (text) => (
    <div className="px-2 py-1 text-sm text-gray-700 bg-white rounded-lg dark:bg-dark dark:text-gray-300">
      {text}
    </div>
  );

  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 left-0 z-40 w-screen h-screen bg-black bg-opacity-50 dark:bg-gray"
          aria-label="Overlay"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <aside
        className={`fixed top-0 left-0 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-dark dark:border-dark-secondary ${
          isOpen ? "translate-x-0 z-40" : "z-10"
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-dark">
          {/* Search tool */}
          <div>
            <MyInput
              type="search"
              placeholder="Search tools..."
              icon={AiOutlineSearch}
              value={keyword}
              onChange={setKeyword}
            />
          </div>

          {/* foreach toolkit */}
          {toolkit.map((section, index) => (
            <ul key={index} className="pt-4 space-y-2">
              <li>
                <div className="text-gray-400 text-sm font-medium uppercase w-full border-b border-gray-200 pb-1 dark:border-dark-secondary dark:text-dark-text-secondary">
                  {section.title}
                </div>
              </li>
              {section.tools.map((tool, index) => (
                <li key={index} className="text-sm">
                  <Popover
                    content={popoverContent(tool.description)}
                    placement="right"
                    trigger="hover"
                  >
                    <NextLink
                      href={section.path + tool.path}
                      className={`flex items-center p-2 rounded-lg  hover:bg-gray-200 dark:hover:bg-dark-secondary group
                      ${
                        currentPath === section.path + tool.path
                          ? "bg-gray-200 dark:bg-dark-secondary"
                          : ""
                      }`}
                    >
                      <tool.icon
                        className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-dark-text-secondary group-hover:text-gray-900 dark:group-hover:text-dark-text`}
                      />
                      <span className="ms-3 ml-1">{tool.name}</span>
                      {tool.status && (
                        <FaRegCheckCircle className="w-4 h-4 ms-auto text-green-500" />
                      )}
                    </NextLink>
                  </Popover>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </aside>
    </>
  );
};

export default MySidebar;
