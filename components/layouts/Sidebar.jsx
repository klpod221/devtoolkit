import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import MyInput from "@/components/MyInput";
import { Popover } from "flowbite-react";

import { AiOutlineSearch } from "react-icons/ai";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";

import toolList from "@/constants/ToolList";

const MySidebar = ({ isOpen, setIsOpen }) => {
  const router = useRouter();
  const currentPath = router.pathname;

  const [keyword, setKeyword] = React.useState("");
  const [toolkit, setToolkit] = React.useState(toolList);

  const [collapsed, setCollapsed] = React.useState([]);

  React.useEffect(() => {
    const search = keyword.toLowerCase().trim();

    if (!search) {
      setToolkit(toolList);
      return;
    }

    setCollapsed([]);

    let filteredToolkit = toolList.map((section) => {
      const tools = section.tools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(search) ||
          tool.description.toLowerCase().includes(search),
      );

      return {
        ...section,
        tools,
      };
    });

    // remove empty sections
    filteredToolkit = filteredToolkit.filter((section) => section.tools.length);

    setToolkit(filteredToolkit);
  }, [keyword]);

  // toggle collapse
  const handleCollapse = (index) => {
    if (collapsed.includes(index)) {
      setCollapsed(collapsed.filter((item) => item !== index));
    } else {
      setCollapsed([...collapsed, index]);
    }
  };

  // scroll to selected item
  React.useEffect(() => {
    const selected = document.querySelector(".sidebar-selected");
    if (selected) {
      selected.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentPath]);

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
        <div className="h-full px-3 overflow-y-auto bg-white dark:bg-dark">
          {/* Search tool */}
          <div className="sticky top-0 z-50 bg-white dark:bg-dark pb-2">
            <MyInput
              type="search"
              placeholder="Search tools..."
              icon={AiOutlineSearch}
              value={keyword}
              onChange={setKeyword}
            />
          </div>

          {/* show error message if no tools found */}
          {toolkit.length === 0 && (
            <div className="text-center mt-4">No tools found!</div>
          )}

          {toolkit.map((section, index) => (
            <ul key={index} className="pt-4">
              <li>
                <div
                  className="text-gray-400 text-sm font-medium uppercase w-full border-gray-200 pb-1 dark:border-dark-secondary dark:text-dark-text-secondary cursor-pointer"
                  onClick={() => handleCollapse(index)}
                >
                  <IoChevronDown
                    className={`w-4 h-4 inline-block mr-1 -ml-[7px] transition-transform ${
                      collapsed.includes(index) ? "-rotate-90" : "rotate-0"
                    }`}
                  />
                  {section.title}
                </div>
              </li>
              <ul
                className={`pl-1 border-l space-y-1 overflow-hidden transition-all delay-150 duration-300 ${
                  collapsed.includes(index) ? "h-0" : ""
                }`}
                id={section.path.replace("/", "")}
              >
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
                          ? "sidebar-selected bg-gray-200 dark:bg-dark-secondary"
                          : ""
                      }`}
                      >
                        <tool.icon
                          className={`w-5 h-5 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-dark-text ${
                            currentPath === section.path + tool.path
                              ? "text-gray-900 dark:text-dark-text"
                              : "text-gray-500 dark:text-dark-text-secondary"
                          }`}
                        />
                        <span className="ms-3 mx-1">{tool.name}</span>
                        {tool.status && (
                          <FaRegCheckCircle className="w-4 h-4 ms-auto text-green-500" />
                        )}
                      </NextLink>
                    </Popover>
                  </li>
                ))}
              </ul>
            </ul>
          ))}

          {/* Footer */}
          <div className="w-full py-10 text-center text-sm text-gray-400 dark:text-dark-text-secondary">
            <p>
              Make with ❤️ by <a href="https://klpod221.site" className="text-blue-500 dark:text-blue-400 hover:underline">klpod221</a>
            </p>
            <p>© 2024 All rights reserved</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default MySidebar;
