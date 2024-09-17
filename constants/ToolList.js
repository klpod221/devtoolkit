import {
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
  AiOutlineCloudUpload,
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

const toolList = [
  {
    title: "Text Editor",
    path: "/editor",
    tools: [
      {
        name: "Code Editor & Compiler",
        description: "Write and run your code.",
        icon: AiOutlineCode,
        path: "/code",
        status: true, // true if tool is ready
      },
      {
        name: "Markdown Editor",
        description: "Write markdown and preview it.",
        icon: AiOutlineFileMarkdown,
        path: "/markdown",
        status: true, // true if tool is ready
      },
    ],
  },
  {
    title: "Web Tools",
    path: "/web",
    tools: [
      {
        name: "File Uploader",
        description: "Upload and share files.",
        icon: AiOutlineCloudUpload,
        path: "/uploader",
        status: true, // true if tool is ready
      },
      {
        name: "Base64 Encoder/Decoder",
        description: "Encode or decode base64 strings.",
        icon: AiOutlineRetweet,
        path: "/base64",
        status: true, // true if tool is ready
      },
      {
        name: "Base64 Image Encoder/Decoder",
        description: "Encode or decode base64 images.",
        icon: AiOutlineRetweet,
        path: "/base64-image",
        status: true, // true if tool is ready
      },
      {
        name: "Bcrypt Hash Generator",
        description: "Bcrypt hash generator and verifier.",
        icon: FaHashtag,
        path: "/bcrypt",
        status: true, // true if tool is ready
      },
      {
        name: "Url Encoder/Decoder",
        description: "Encode or decode url strings.",
        icon: AiOutlineRetweet,
        path: "/url",
        status: false, // true if tool is ready
      },
      {
        name: "Url Parser",
        description: "Parse url strings.",
        icon: AiOutlineRetweet,
        path: "/url-parser",
        status: false, // true if tool is ready
      },
      {
        name: "Digital Certificate Decoder",
        description: "Decode digital certificates.",
        icon: FaLock,
        path: "/certificate",
        status: false, // true if tool is ready
      },
      {
        name: "JSON Converter",
        description: "Convert JSON to XML, YAML, CSV, etc and vice versa.",
        icon: AiOutlineRetweet,
        path: "/json",
        status: false, // true if tool is ready
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
        status: true, // true if tool is ready
      },
      {
        name: "Compressor",
        description: "Reduce the size of your images.",
        icon: AiOutlineFileImage,
        path: "/compressor",
        status: false, // true if tool is ready
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
        status: false, // true if tool is ready
      },
      {
        name: "Text Diff",
        description: "Compare two texts.",
        icon: AiOutlineDiff,
        path: "/diff",
        status: false, // true if tool is ready
      },
      {
        name: "Word Counter",
        description: "Count words, characters and distribution.",
        icon: GiDigitalTrace,
        path: "/counter",
        status: false, // true if tool is ready
      },
      {
        name: "Lorem Ipsum",
        description: "Generate placeholder text.",
        icon: AiOutlineFieldString,
        path: "/lorem-ipsum",
        status: false, // true if tool is ready
      },
      {
        name: "Random String",
        description: "Generate random strings for passwords etc.",
        icon: GiPerspectiveDiceSixFacesRandom,
        path: "/random",
        status: false, // true if tool is ready
      },
      {
        name: "Hex Converter",
        description: "Convert hex to unicode and vice versa.",
        icon: AiOutlineRetweet,
        path: "/hex",
        status: false, // true if tool is ready
      },
      {
        name: "Text Case Converter",
        description: "Convert text to upper, lower, title, sentence case.",
        icon: AiOutlineRetweet,
        path: "/case",
        status: false, // true if tool is ready
      },
      {
        name: "Text to Image",
        description: "Convert text to image.",
        icon: AiOutlineRetweet,
        path: "/to-image",
        status: false, // true if tool is ready
      },
      {
        name: "Backslash Converter",
        description: "Escape or unescape backslashes.",
        icon: AiOutlinePercentage,
        path: "/backslash",
        status: false, // true if tool is ready
      },
      {
        name: "List Sorter/Randomizer",
        description: "Sort or randomize lists.",
        icon: AiOutlineSortAscending,
        path: "/sort",
        status: false, // true if tool is ready
      },
      {
        name: "Text to Speech",
        description: "Convert text to speech.",
        icon: HiSpeakerphone,
        path: "/speech",
        status: false, // true if tool is ready
      },
      {
        name: "Morse Code Converter",
        description: "Convert text to Morse code and vice versa.",
        icon: AiOutlineFieldString,
        path: "/morse",
        status: false, // true if tool is ready
      },
      {
        name: "QR Code Generator",
        description: "Convert text to QR code and vice versa.",
        icon: AiOutlineQrcode,
        path: "/qr-code",
        status: false, // true if tool is ready
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
        status: false, // true if tool is ready
      },
      {
        name: "Number Base Converter",
        description: "Convert number bases.",
        icon: TbNumber10Small,
        path: "/number",
        status: false, // true if tool is ready
      },
      {
        name: "Unit Converter",
        description: "Convert units.",
        icon: LiaWeightSolid,
        path: "/unit",
        status: false, // true if tool is ready
      },
      {
        name: "Time Converter",
        description: "Convert time zones and formats.",
        icon: FaRegClock,
        path: "/time",
        status: false, // true if tool is ready
      },
      {
        name: "Currency Converter",
        description: "Convert currencies.",
        icon: MdCurrencyExchange,
        path: "/currency",
        status: false, // true if tool is ready
      },
      {
        name: "Hash Generator",
        description: "Generate hashes.",
        icon: FaHashtag,
        path: "/hash",
        status: false, // true if tool is ready
      },
      {
        name: "UUID Generator",
        description: "Generate UUIDs.",
        icon: FaIdCardAlt,
        path: "/uuid",
        status: false, // true if tool is ready
      },
      {
        name: "Password Generator",
        description: "Generate passwords.",
        icon: MdOutlinePassword,
        path: "/password",
        status: false, // true if tool is ready
      },
      {
        name: "Unix Timestamp Converter",
        description: "Convert unix timestamps.",
        icon: FaRegClock,
        path: "/timestamp",
        status: false, // true if tool is ready
      },
      {
        name: "IP Address Converter",
        description: "Convert IP addresses.",
        icon: TbWorldWww,
        path: "/ip",
        status: false, // true if tool is ready
      },
      {
        name: "Cron Expression Generator",
        description: "Generate cron expressions.",
        icon: TfiReload,
        path: "/cron",
        status: false, // true if tool is ready
      },
    ],
  },
];

export default toolList;
