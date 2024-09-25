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
import { RiImageEditLine, RiMailSendLine } from "react-icons/ri";
import {
  GiDigitalTrace,
  GiPerspectiveDiceSixFacesRandom,
} from "react-icons/gi";
import { HiSpeakerphone } from "react-icons/hi";
import { TbNumber10Small } from "react-icons/tb";
import { LiaWeightSolid } from "react-icons/lia";
import { MdCurrencyExchange, MdOutlinePassword } from "react-icons/md";
import {
  FaLock,
  FaUnlock,
  FaRegClock,
  FaHashtag,
  FaIdCardAlt,
  FaDocker,
  FaUbuntu,
} from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import { TfiReload } from "react-icons/tfi";
import { SiNginx } from "react-icons/si";
import { CgColorPicker } from "react-icons/cg";
import { LuFileJson } from "react-icons/lu";

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
        status: true,
      },
      {
        name: "Markdown Editor",
        description: "Write markdown and preview it.",
        icon: AiOutlineFileMarkdown,
        path: "/markdown",
        status: true,
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
        status: true,
      },
      {
        name: "JPEG/WEBP Compressor",
        description:
          "Reduce the size of your images for JPEG and WEBP formats.",
        icon: AiOutlineFileImage,
        path: "/compressor",
        status: true,
      },
      {
        name: "Resizer",
        description: "Resize your images.",
        icon: AiOutlineFileImage,
        path: "/resizer",
        status: true,
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
        status: true,
      },
      {
        name: "Base64 Converter",
        description: "Encode or decode base64 strings.",
        icon: AiOutlineRetweet,
        path: "/base64",
        status: true,
      },
      {
        name: "Base64 Image Converter",
        description: "Encode or decode base64 images.",
        icon: AiOutlineRetweet,
        path: "/base64-image",
        status: true,
      },
      {
        name: "Bcrypt Hash Generator",
        description: "Bcrypt hash generator and verifier.",
        icon: FaHashtag,
        path: "/bcrypt",
        status: true,
      },
      {
        name: "Url Encoder/Decoder",
        description: "Encode or decode url strings.",
        icon: AiOutlineRetweet,
        path: "/url",
        status: true,
      },
      {
        name: "Url Parser",
        description: "Parse url strings.",
        icon: AiOutlineRetweet,
        path: "/url-parser",
        status: true,
      },
      {
        name: "JSON Converter",
        description: "Convert JSON to XML, YAML etc.",
        icon: LuFileJson,
        path: "/json",
        status: true,
      },
      {
        name: "Back to JSON",
        description: "Convert XML, YAML to JSON.",
        icon: LuFileJson,
        path: "/back-to-json",
        status: true,
      },
    ],
  },
  {
    title: "System Tools",
    path: "/system",
    tools: [
      {
        name: "Nginx Config Generator",
        description: "Generate Nginx configuration files.",
        icon: SiNginx,
        path: "/nginx",
        status: false,
      },
      {
        name: "Dockerize helper",
        description: "Generate Dockerfile and docker-compose files.",
        icon: FaDocker,
        path: "/docker",
        status: false,
      },
      {
        name: "Ubuntu Server Configurator",
        description: "Generate Ubuntu server configuration.",
        icon: FaUbuntu,
        path: "/ubuntu",
        status: false,
      },
      {
        name: "IMAP/POP3/SMTP Tester",
        description: "Test IMAP, POP3, SMTP servers.",
        icon: RiMailSendLine,
        path: "/mail",
        status: false,
      },
      {
        name: "IP Address Converter",
        description: "Convert IP addresses to different formats.",
        icon: TbWorldWww,
        path: "/ip",
        status: false,
      },
      {
        name: "Cron Expression Generator",
        description: "Generate cron expressions.",
        icon: TfiReload,
        path: "/cron-generator",
        status: false,
      },
      {
        name: "Cron Expression Parser",
        description: "Parse cron expressions.",
        icon: TfiReload,
        path: "/cron-parser",
        status: false,
      },
      {
        name: "Digital Certificate Decoder",
        description: "Decode digital certificates.",
        icon: FaUnlock,
        path: "/certificate-decoder",
        status: true,
      },
      {
        name: "Digital Certificate Generator",
        description: "Generate digital certificates.",
        icon: FaLock,
        path: "/certificate-generator",
        status: false,
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
        status: true,
      },
      {
        name: "Text Diff",
        description: "Compare two texts.",
        icon: AiOutlineDiff,
        path: "/diff",
        status: true,
      },
      {
        name: "Word Counter",
        description: "Count words, characters and distribution.",
        icon: GiDigitalTrace,
        path: "/counter",
        status: true,
      },
      {
        name: "Lorem Ipsum",
        description: "Generate placeholder text.",
        icon: AiOutlineFieldString,
        path: "/lorem-ipsum",
        status: true,
      },
      {
        name: "Random String",
        description: "Generate random strings for passwords etc.",
        icon: GiPerspectiveDiceSixFacesRandom,
        path: "/random",
        status: true,
      },
      {
        name: "Unicode To Hex",
        description: "Convert unicode to hex.",
        icon: AiOutlineRetweet,
        path: "/unicode-to-hex",
        status: true,
      },
      {
        name: "Hex To Unicode",
        description: "Convert hex to unicode.",
        icon: AiOutlineRetweet,
        path: "/hex-to-unicode",
        status: true,
      },
      {
        name: "Text Case Converter",
        description: "Convert text to upper, lower, capitalize, camelCase etc.",
        icon: AiOutlineRetweet,
        path: "/case",
        status: true,
      },
      {
        name: "Text to Image",
        description: "Convert text to image.",
        icon: AiOutlineRetweet,
        path: "/to-image",
        status: false,
      },
      {
        name: "Text to Speech",
        description: "Convert text to speech.",
        icon: HiSpeakerphone,
        path: "/speech",
        status: false,
      },
      {
        name: "Backslash Converter",
        description: "Escape or unescape backslashes.",
        icon: AiOutlinePercentage,
        path: "/backslash",
        status: true,
      },
      {
        name: "List Sorter/Randomizer",
        description: "Sort or randomize lists.",
        icon: AiOutlineSortAscending,
        path: "/sort-random",
        status: true,
      },
      {
        name: "Morse Code Converter",
        description: "Convert text to Morse code and vice versa.",
        icon: AiOutlineFieldString,
        path: "/morse",
        status: false,
      },
      {
        name: "QR Code Generator",
        description: "Convert text to QR code and vice versa.",
        icon: AiOutlineQrcode,
        path: "/qr-code",
        status: false,
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
        status: false,
      },
      {
        name: "Color Picker",
        description: "Pick colors from the color picker or upload an image.",
        icon: CgColorPicker,
        path: "/picker",
        status: false,
      },
      {
        name: "Number Base Converter",
        description: "Convert number bases.",
        icon: TbNumber10Small,
        path: "/number",
        status: false,
      },
      {
        name: "Unit Converter",
        description: "Convert units.",
        icon: LiaWeightSolid,
        path: "/unit",
        status: false,
      },
      {
        name: "Time Converter",
        description: "Convert time zones and formats.",
        icon: FaRegClock,
        path: "/time",
        status: false,
      },
      {
        name: "Currency Converter",
        description: "Convert currencies.",
        icon: MdCurrencyExchange,
        path: "/currency",
        status: false,
      },
      {
        name: "Hash Generator",
        description: "Generate hashes.",
        icon: FaHashtag,
        path: "/hash",
        status: false,
      },
      {
        name: "UUID Generator",
        description: "Generate UUIDs.",
        icon: FaIdCardAlt,
        path: "/uuid",
        status: false,
      },
      {
        name: "Password Generator",
        description: "Generate passwords.",
        icon: MdOutlinePassword,
        path: "/password",
        status: false,
      },
      {
        name: "Unix Timestamp Converter",
        description: "Convert unix timestamps.",
        icon: FaRegClock,
        path: "/timestamp",
        status: false,
      },
    ],
  },
];

export default toolList;
