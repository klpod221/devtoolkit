import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Popover } from "flowbite-react";

import TOOL_LIST from "@constants/tool_list";

import MyInput from "@/components/MyInput";

import { AiOutlineSearch } from "react-icons/ai";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";

const MySidebar = ({ isOpen, setIsOpen }) => {
  const router = useRouter();
  const currentPath = router.pathname;

  const [favoriteTools, setFavoriteTools] = React.useState([]);

  const [keyword, setKeyword] = React.useState("");
  const [toolkit, setToolkit] = React.useState(TOOL_LIST);

  const [collapsed, setCollapsed] = React.useState([]);

  // get favorite tools from local storage
  const getFavoriteTools = () => {
    let localFavoriteTools = localStorage.getItem("favoriteTools");
    localFavoriteTools = JSON.parse(localFavoriteTools);

    if (!localFavoriteTools) {
      localFavoriteTools = [];
      localStorage.setItem("favoriteTools", JSON.stringify(localFavoriteTools));
    }

    const selectedTools = [];
    TOOL_LIST.forEach((section) => {
      const tools = section.tools.filter((tool) =>
        localFavoriteTools.includes(section.path + tool.path),
      );

      if (tools.length) {
        const selected = [];
        tools.forEach((tool) => {
          selected.push({
            ...tool,
            path: section.path + tool.path,
          });
        });

        selectedTools.push(...selected);
      }
    });

    setFavoriteTools(selectedTools);
  };

  React.useEffect(() => {
    getFavoriteTools();
  }, []);

  // toggle favorite tool by path
  const toggleFavorite = (path) => {
    let localFavoriteTools = localStorage.getItem("favoriteTools");
    localFavoriteTools = JSON.parse(localFavoriteTools);

    if (localFavoriteTools.includes(path)) {
      localFavoriteTools = localFavoriteTools.filter((item) => item !== path);
    } else {
      localFavoriteTools.push(path);
    }

    localStorage.setItem("favoriteTools", JSON.stringify(localFavoriteTools));

    getFavoriteTools();
  };

  // filter toolkit by keyword
  React.useEffect(() => {
    const search = keyword.toLowerCase().trim();

    if (!search) {
      setToolkit(TOOL_LIST);
      return;
    }

    setCollapsed([]);

    let filteredToolkit = TOOL_LIST.map((section) => {
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

  // handle section collapse
  const handleCollapse = (index) => {
    if (collapsed.includes(index)) {
      setCollapsed(collapsed.filter((item) => item !== index));
    } else {
      setCollapsed([...collapsed, index]);
    }
  };

  // scroll to selected tool
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
              placeholder="Press Alt + / to search"
              icon={AiOutlineSearch}
              value={keyword}
              onChange={setKeyword}
              id="search-input"
            />
          </div>

          {/* show error message if no tools found */}
          {toolkit.length === 0 && (
            <div className="text-center mt-4">No tools found!</div>
          )}

          {/* Favorite tools */}
          {favoriteTools && favoriteTools.length > 0 && (
            <ul className="pt-4">
              <li>
                <div
                  className="text-gray-400 text-sm font-medium uppercase w-full border-gray-200 pb-1 dark:border-dark-secondary dark:text-dark-text-secondary cursor-pointer"
                  onClick={() => handleCollapse("favorite")}
                >
                  <IoChevronDown
                    className={`w-4 h-4 inline-block mr-1 -ml-[7px] transition-transform ${
                      collapsed.includes("favorite") ? "-rotate-90" : "rotate-0"
                    }`}
                  />
                  Favorite Tools
                </div>
              </li>
              <ul
                className={`pl-1 border-l space-y-1 overflow-hidden transition-all delay-150 duration-300 ${
                  collapsed.includes("favorite") ? "h-0" : ""
                }`}
                id="favorite"
              >
                {favoriteTools.map((tool, index) => (
                  <li key={index} className="text-sm">
                    <Popover
                      content={popoverContent(tool.description)}
                      placement="right"
                      trigger="hover"
                    >
                      <NextLink
                        href={tool.path}
                        className={`flex items-center p-2 rounded-lg  hover:bg-gray-200 dark:hover:bg-dark-secondary group
                      ${
                        currentPath === tool.path
                          ? "sidebar-selected bg-gray-200 dark:bg-dark-secondary"
                          : ""
                      }`}
                      >
                        <tool.icon
                          className={`w-5 h-5 transition duration-75 text-blue-500`}
                        />
                        <div
                          className={`ms-3 mx-1 flex space-x-1 items-center ${!tool.status && "text-gray-400"}`}
                        >
                          {tool.name}
                        </div>

                        <div
                          className="ml-auto text-red-500 dark:text-red-400"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleFavorite(tool.path);
                          }}
                        >
                          <FaHeart />
                        </div>
                      </NextLink>
                    </Popover>
                  </li>
                ))}
              </ul>
            </ul>
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
                          className={`w-5 h-5 transition duration-75 text-blue-500`}
                        />
                        <div
                          className={`ms-3 mx-1 flex space-x-1 items-center ${!tool.status && "text-gray-400"}`}
                        >
                          {tool.name}
                        </div>

                        <div
                          className="ml-auto text-red-500 dark:text-red-400"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleFavorite(section.path + tool.path);
                          }}
                        >
                          {favoriteTools.some(
                            (item) => item.path === section.path + tool.path,
                          ) ? (
                            <FaHeart />
                          ) : (
                            <FaRegHeart />
                          )}
                        </div>
                      </NextLink>
                    </Popover>
                  </li>
                ))}
              </ul>
            </ul>
          ))}

          {/* Footer */}
          <div className="w-full py-10 text-center text-sm">
            <p>
              Make with ❤️ by{" "}
              <a
                href="https://klpod221.com"
                className="text-blue-500 dark:text-blue-400 hover:underline"
              >
                klpod221
              </a>
            </p>
            <p>© 2024 All rights reserved</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default MySidebar;
