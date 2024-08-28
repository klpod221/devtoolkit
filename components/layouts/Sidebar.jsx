import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { TextInput, Popover } from "flowbite-react";

import {
  AiOutlineSearch,
  AiOutlineFileImage,
  AiOutlineCode,
  AiOutlineFileMarkdown,
  AiOutlineDiff,
  AiOutlineFieldString,
  AiOutlineRetweet,
  AiOutlinePercentage,
  AiOutlineSortAscending,
  AiOutlineQrcode,
  AiOutlineBgColors,
} from "react-icons/ai";
import { BsRegex } from "react-icons/bs";
import { RiImageEditLine } from "react-icons/ri";
import {
  GiDigitalTrace,
  GiPerspectiveDiceSixFacesRandom,
} from "react-icons/gi";
import { HiSpeakerphone } from "react-icons/hi";
import { TbNumber10Small } from "react-icons/tb";
import { LiaWeightSolid } from "react-icons/lia";
import { MdCurrencyExchange, MdOutlinePassword } from "react-icons/md";
import { FaLock, FaRegClock, FaHashtag, FaIdCardAlt } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import { TfiReload } from "react-icons/tfi";

const toolkitList = [
  {
    title: "Text Editor",
    path: "/editor",
    tools: [
      {
        name: "Code Editor & Compiler",
        description: "Write and run your code.",
        icon: AiOutlineCode,
        path: "/code",
      },
      {
        name: "Markdown Editor",
        description: "Write markdown and preview it.",
        icon: AiOutlineFileMarkdown,
        path: "/markdown",
      },
    ],
  },
  {
    title: "Web Tools",
    path: "/web",
    tools: [
      {
        name: "Base64 Encoder/Decoder",
        description: "Encode or decode base64 strings.",
        icon: AiOutlineRetweet,
        path: "/base64",
      },
      {
        name: "Bcrypt Hash Generator",
        description: "Bcrypt hash generator and verifier.",
        icon: FaHashtag,
        path: "/bcrypt",
      },
      {
        name: "Base64 Image Encoder/Decoder",
        description: "Encode or decode base64 images.",
        icon: AiOutlineRetweet,
        path: "/base64-image",
      },
      {
        name: "Url Encoder/Decoder",
        description: "Encode or decode url strings.",
        icon: AiOutlineRetweet,
        path: "/url",
      },
      {
        name: "Url Parser",
        description: "Parse url strings.",
        icon: AiOutlineRetweet,
        path: "/url-parser",
      },
      {
        name: "Digital Certificate Decoder",
        description: "Decode digital certificates.",
        icon: FaLock,
        path: "/certificate",
      },
      {
        name: "JSON Converter",
        description: "Convert JSON to XML, YAML, CSV, etc and vice versa.",
        icon: AiOutlineRetweet,
        path: "/json",
      },
    ],
  },
  {
    title: "Image Tools",
    path: "/image",
    tools: [
      {
        name: "Format Converter",
        description: "Convert your images to different formats.",
        icon: RiImageEditLine,
        path: "/converter",
      },
      {
        name: "Compressor",
        description: "Reduce the size of your images.",
        icon: AiOutlineFileImage,
        path: "/compressor",
      },
    ],
  },
  {
    title: "Text Tools",
    path: "/text",
    tools: [
      {
        name: "Regex Tester",
        description: "Test your regular expressions.",
        icon: BsRegex,
        path: "/regex",
      },
      {
        name: "Text Diff",
        description: "Compare two texts.",
        icon: AiOutlineDiff,
        path: "/diff",
      },
      {
        name: "Word Counter",
        description: "Count words, characters and distribution.",
        icon: GiDigitalTrace,
        path: "/counter",
      },
      {
        name: "Lorem Ipsum",
        description: "Generate placeholder text.",
        icon: AiOutlineFieldString,
        path: "/lorem-ipsum",
      },
      {
        name: "Random String",
        description: "Generate random strings for passwords etc.",
        icon: GiPerspectiveDiceSixFacesRandom,
        path: "/random",
      },
      {
        name: "Hex Converter",
        description: "Convert hex to unicode and vice versa.",
        icon: AiOutlineRetweet,
        path: "/hex",
      },
      {
        name: "Text Case Converter",
        description: "Convert text to upper, lower, title, sentence case.",
        icon: AiOutlineRetweet,
        path: "/case",
      },
      {
        name: "Text to Image",
        description: "Convert text to image.",
        icon: AiOutlineRetweet,
        path: "/to-image",
      },
      {
        name: "Backslash Converter",
        description: "Escape or unescape backslashes.",
        icon: AiOutlinePercentage,
        path: "/backslash",
      },
      {
        name: "List Sorter/Randomizer",
        description: "Sort or randomize lists.",
        icon: AiOutlineSortAscending,
        path: "/sort",
      },
      {
        name: "Text to Speech",
        description: "Convert text to speech.",
        icon: HiSpeakerphone,
        path: "/speech",
      },
      {
        name: "Text to Morse Code",
        description: "Convert text to morse code.",
        icon: AiOutlineFieldString,
        path: "/morse",
      },
      {
        name: "Text to QR Code",
        description: "Convert text to QR code.",
        icon: AiOutlineQrcode,
        path: "/qr-code",
      },
    ],
  },
  {
    title: "Utility Tools",
    path: "/utility",
    tools: [
      {
        name: "Color Converter",
        description: "Convert color codes to different formats.",
        icon: AiOutlineBgColors,
        path: "/color",
      },
      {
        name: "Number Base Converter",
        description: "Convert number bases.",
        icon: TbNumber10Small,
        path: "/number",
      },
      {
        name: "Unit Converter",
        description: "Convert units.",
        icon: LiaWeightSolid,
        path: "/unit",
      },
      {
        name: "Time Converter",
        description: "Convert time zones and formats.",
        icon: FaRegClock,
        path: "/time",
      },
      {
        name: "Currency Converter",
        description: "Convert currencies.",
        icon: MdCurrencyExchange,
        path: "/currency",
      },
      {
        name: "Hash Generator",
        description: "Generate hashes.",
        icon: FaHashtag,
        path: "/hash",
      },
      {
        name: "UUID Generator",
        description: "Generate UUIDs.",
        icon: FaIdCardAlt,
        path: "/uuid",
      },
      {
        name: "Password Generator",
        description: "Generate passwords.",
        icon: MdOutlinePassword,
        path: "/password",
      },
      {
        name: "Unix Timestamp Converter",
        description: "Convert unix timestamps.",
        icon: FaRegClock,
        path: "/timestamp",
      },
      {
        name: "IP Address Converter",
        description: "Convert IP addresses.",
        icon: TbWorldWww,
        path: "/ip",
      },
      {
        name: "Cron Expression Generator",
        description: "Generate cron expressions.",
        icon: TfiReload,
        path: "/cron",
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
                      href={section.path + tool.path}
                      className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group
                      ${
                        currentPath === section.path + tool.path
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
