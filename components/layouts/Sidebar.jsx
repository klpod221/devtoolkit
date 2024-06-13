import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { TextInput } from "flowbite-react";

import {
  AiOutlineSearch,
  AiOutlineMenuUnfold,
  AiOutlineFileImage,
  AiOutlinePicture,
  AiOutlineCode,
} from "react-icons/ai";

const MySidebar = ({ isOpen, setIsOpen }) => {
  const router = useRouter();
  const currentPath = router.pathname;

  const [keyword, setKeyword] = React.useState("");

  const toolkit = [
    {
      title: "Code Editor",
      tools: [
        {
          title: "Code Editor",
          description: "Edit your code.",
          icon: AiOutlineCode,
          url: "/code-editor",
        },
      ],
    },
    {
      title: "HTML / CSS / JS",
      tools: [
        {
          title: "HTML Formatter",
          description: "Format your HTML code.",
          icon: AiOutlineMenuUnfold,
          url: "/html-formatter",
        },
        {
          title: "CSS Formatter",
          description: "Format your CSS code.",
          icon: AiOutlineMenuUnfold,
          url: "/css-formatter",
        },
        {
          title: "JS Formatter",
          description: "Format your JavaScript code.",
          icon: AiOutlineMenuUnfold,
          url: "/js-formatter",
        },
      ],
    },
    {
      title: "Images",
      tools: [
        {
          title: "Image Compressor",
          description: "Compress your images.",
          icon: AiOutlineFileImage,
          url: "/image-compressor",
        },
        {
          title: "Image Cropper",
          description: "Crop your images.",
          icon: AiOutlinePicture,
          url: "/image-cropper",
        },
        {
          title: "Image Resizer",
          description: "Resize your images.",
          icon: AiOutlinePicture,
          url: "/image-resizer",
        },
      ],
    },
  ];

  return (
    <>
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 ${
          isOpen ? "translate-x-0" : ""
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          {/* Search tool */}
          <div>
            <TextInput
              type="search"
              placeholder="Search tools..."
              icon={AiOutlineSearch}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
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
              {section.tools
                .filter((tool) =>
                  tool.title.toLowerCase().includes(keyword.toLowerCase())
                )
                .map((tool, index) => (
                  <li key={index} className="text-sm">
                    <Link
                      href={tool.url}
                      className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group
                      ${
                        currentPath == tool.url
                          ? "bg-gray-200 dark:bg-gray-700"
                          : ""
                      }`}
                    >
                      <tool.icon className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white`} />
                      <span className="ms-3">{tool.title}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          ))}
        </div>
      </aside>

      <div
        className={`fixed top-0 left-0 z-30 w-screen h-full bg-black bg-opacity-50 dark:bg-gray-900 ${
          isOpen ? "" : "hidden"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      ></div>
    </>
  );
};

export default MySidebar;
