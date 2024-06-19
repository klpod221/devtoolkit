import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { TextInput, Popover } from "flowbite-react";

import {
  AiOutlineSearch,
  AiOutlineFileImage,
  AiOutlineCode,
} from "react-icons/ai";

import { RiImageEditLine } from "react-icons/ri";

const toolkitList = [
  {
    title: "Code Editor",
    tools: [
      {
        name: "Code Editor",
        description: "Edit your code.",
        icon: AiOutlineCode,
        url: "/code-editor",
      },
    ],
  },
  {
    title: "Image Tools",
    tools: [
      {
        name: "Format Converter",
        description: "Convert your images to different formats.",
        icon: RiImageEditLine,
        url: "/image/format-converter",
      },
      {
        name: "Compressor",
        description: "Reduce the size of your images.",
        icon: AiOutlineFileImage,
        url: "/image/compressor",
      },
    ],
  },
];

const MySidebar = ({ isOpen, setIsOpen }) => {
  const router = useRouter();
  const currentPath = router.pathname;

  const [keyword, setKeyword] = React.useState("");
  const [toolkit, setToolkit] = React.useState(toolkitList);

  const onSearch = (e) => {
    setKeyword(e.target.value);

    const search = e.target.value.toLowerCase();

    const filteredToolkit = toolkitList.map((section) => {
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
  };

  const popoverContent = (text) => (
    <div className="px-2 py-1 text-sm text-gray-700 bg-white rounded-lg dark:bg-gray-800 dark:text-gray-300">
      {text}
    </div>
  );

  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 left-0 z-20 w-screen h-screen bg-black bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-50"
          aria-label="Overlay"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <aside
        className={`fixed top-0 left-0 z-30 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 ${
          isOpen ? "translate-x-0" : ""
        }`}
        aria-label="Sidebar"
      >
        {/* dark background */}

        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          {/* Search tool */}
          <div>
            <TextInput
              type="search"
              placeholder="Search tools..."
              icon={AiOutlineSearch}
              value={keyword}
              onChange={onSearch}
            />
          </div>

          {/* foreach toolkit */}
          {toolkit.map((section, index) => (
            <ul key={index} className="pt-4 space-y-2">
              <li>
                <div className="text-gray-400 text-sm font-medium uppercase dark:text-white w-full border-b border-gray-200 dark:border-white pb-1">
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
                    <Link
                      href={tool.url == currentPath ? "#" : tool.url}
                      className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group
                      ${
                        currentPath == tool.url
                          ? "bg-gray-200 dark:bg-gray-700"
                          : ""
                      }`}
                    >
                      <tool.icon
                        className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white`}
                      />
                      <span className="ms-3">{tool.name}</span>
                    </Link>
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
