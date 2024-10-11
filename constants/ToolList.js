import {
  AiOutlineFileImage,
  AiOutlineCode,
  AiOutlineFileMarkdown,
  AiOutlineDiff,
  AiOutlineFieldString,
  AiOutlineRetweet,
  AiOutlinePercentage,
  AiOutlineQrcode,
  AiOutlineBgColors,
  AiOutlineCloudUpload,
  AiOutlineFieldBinary,
  AiFillCamera,
} from "react-icons/ai";
import {
  BsRegex,
  BsFileEarmarkBinaryFill,
  BsWindowSidebar,
  BsFileLock,
  BsFillStopwatchFill,
} from "react-icons/bs";
import {
  RiImageEditLine,
  RiMailSendLine,
  RiLockPasswordFill,
} from "react-icons/ri";
import {
  GiDigitalTrace,
  GiPerspectiveDiceSixFacesRandom,
} from "react-icons/gi";
import { HiSpeakerphone } from "react-icons/hi";
import { HiBars3BottomLeft, HiBars2 } from "react-icons/hi2";
import { LiaWeightSolid } from "react-icons/lia";
import {
  MdCurrencyExchange,
  MdMonitor,
  MdSmartphone,
  MdKey,
  MdAbc,
  MdHttp,
  MdNumbers,
  MdOutlineDns,
  MdNetworkCheck,
  MdPhonelink,
  MdSpeed,
} from "react-icons/md";
import {
  FaLock,
  FaRegClock,
  FaHashtag,
  FaDocker,
  FaUbuntu,
  FaUnlink,
  FaTags,
  FaPassport,
  FaNetworkWired,
} from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import {
  TbLetterCaseToggle,
  TbSpeakerphone,
  TbBinary,
  TbLetterX,
  TbList,
  TbCalendarTime,
  TbBrackets,
  TbWorld,
  TbKeyboard,
  TbMailbox,
  TbMoodSmile,
  TbEyeOff,
  TbCpu,
  TbArrowsShuffle,
  TbFingerprint,
  TbSortDescendingNumbers,
  TbCertificate,
  TbCertificateOff,
  TbCertificate2,
  TbServer,
  TbAlarm,
  TbRouter,
  TbBracketsAngle,
  TbMath,
  TbHourglass,
  TbPercentage,
} from "react-icons/tb";
import { SiNginx } from "react-icons/si";
import { CgColorPicker } from "react-icons/cg";
import { PiFileHtmlFill } from "react-icons/pi";
import { CgPassword } from "react-icons/cg";

const toolList = [
  {
    title: "Text Editor",
    path: "/editor",
    tools: [
      {
        name: "Code Editor & Compiler",
        description:
          "Write code in different languages (HTML, JS, CSS, Python, Java, C, C++, PHP, etc.) and compile it.",
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
      {
        name: "HTML WYSIWYG Editor",
        description: "Write, edit your text and get the HTML output.",
        icon: PiFileHtmlFill,
        path: "/wysiwyg",
        status: true,
      },
    ],
  },
  {
    title: "Images/Videos Tools",
    path: "/images-videos",
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
      {
        name: "Base64 Image Converter",
        description: "Encode or decode base64 images.",
        icon: AiOutlineRetweet,
        path: "/base64-image",
        status: true,
      },
      {
        name: "QR Code Generator",
        description: "Convert text to QR code and vice versa.",
        icon: AiOutlineQrcode,
        path: "/qr-code",
        status: true,
      },
      {
        name: "SVG Placeholder Generator",
        description: "Generate SVG placeholders.",
        icon: AiOutlineFileImage,
        path: "/svg-placeholder",
        status: true,
      },
      {
        name: "Camera Recorder",
        description: "Record video from your camera.",
        icon: AiFillCamera,
        path: "/camera",
        status: true,
      },
    ],
  },
  {
    title: "Converter Tools",
    path: "/converter",
    tools: [
      {
        name: "Date-Time Converter",
        description: "Convert date and time formats.",
        icon: TbCalendarTime,
        path: "/date-time",
        status: true,
      },
      {
        name: "Number Base Converter",
        description: "Convert number bases.",
        icon: AiOutlineFieldBinary,
        path: "/number",
        status: false,
      },
      {
        name: "Roman Numeral Converter",
        description: "Convert roman numerals.",
        icon: TbLetterX,
        path: "/roman",
        status: false,
      },
      {
        name: "Base64 Converter",
        description: "Encode or decode base64 strings.",
        icon: BsFileEarmarkBinaryFill,
        path: "/base64",
        status: true,
      },
      {
        name: "Color Converter",
        description: "Convert color codes to different formats.",
        icon: AiOutlineBgColors,
        path: "/color",
        status: true,
      },
      {
        name: "Text Case Converter",
        description: "Convert text to upper, lower, capitalize, camelCase etc.",
        icon: TbLetterCaseToggle,
        path: "/text-case",
        status: true,
      },
      {
        name: "NATO Alphabet Converter",
        description: "Convert text to NATO alphabet.",
        icon: TbSpeakerphone,
        path: "/nato",
        status: false,
      },
      {
        name: "ASCII Binary Converter",
        description: "Convert text to ASCII binary.",
        icon: TbBinary,
        path: "/ascii-binary",
        status: false,
      },
      {
        name: "Unicode Converter",
        description: "Convert text to unicode and vice versa.",
        icon: AiOutlineRetweet,
        path: "/unicode",
        status: false,
      },
      {
        name: "List Converter",
        description: "Convert lists to different formats.",
        icon: TbList,
        path: "/list",
        status: true,
      },
      {
        name: "Data Type Converter",
        description: "Convert between JSON, XML, YAML, TOML, CSV etc.",
        icon: TbBrackets,
        path: "/data-type",
        status: true,
      },
      {
        name: "Unit Converter",
        description: "Convert units of length, weight, temperature etc.",
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
        description: "Convert currencies with live rates.",
        icon: MdCurrencyExchange,
        path: "/currency",
        status: false,
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
        name: "Url Encoder/Decoder",
        description: "Encode or decode url strings.",
        icon: FaLink,
        path: "/url",
        status: true,
      },
      {
        name: "Url Parser",
        description: "Parse url strings.",
        icon: FaUnlink,
        path: "/url-parser",
        status: true,
      },
      {
        name: "Device Information",
        description: "Show Your Device Information.",
        icon: MdMonitor,
        path: "/device",
        status: true,
      },
      {
        name: "Basic Auth Generator",
        description: "Generate basic auth headers.",
        icon: RiLockPasswordFill,
        path: "/basic-auth",
        status: false,
      },
      {
        name: "Open Graph Meta Generator",
        description: "Generate open graph meta tags.",
        icon: FaTags,
        path: "/open-graph",
        status: false,
      },
      {
        name: "OTP Code Generator",
        description: "Generate OTP codes.",
        icon: MdSmartphone,
        path: "/otp",
        status: false,
      },
      {
        name: "MIME Types",
        description: "Get MIME types.",
        icon: TbWorld,
        path: "/mime",
        status: false,
      },
      {
        name: "JWT Parser",
        description: "Parse JWT tokens.",
        icon: MdKey,
        path: "/jwt",
        status: false,
      },
      {
        name: "Keycode Info",
        description: "Get keycode information.",
        icon: TbKeyboard,
        path: "/keycode",
        status: false,
      },
      {
        name: "Slugify String",
        description: "Slugify your strings.",
        icon: MdAbc,
        path: "/slugify",
        status: false,
      },
      {
        name: "User Agent Parser",
        description: "Parse user agent strings.",
        icon: BsWindowSidebar,
        path: "/user-agent",
        status: false,
      },
      {
        name: "HTTP status code",
        description: "Get HTTP status codes.",
        icon: MdHttp,
        path: "/http-status",
        status: false,
      },
      {
        name: "Outlook Safe Link Decoder",
        description: "Decode outlook safe links.",
        icon: TbMailbox,
        path: "/outlook",
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
        name: "Backslash Escaper",
        description: "Escape or unescape backslashes.",
        icon: AiOutlinePercentage,
        path: "/backslash",
        status: true,
      },
      {
        name: "Morse Code Translator",
        description: "Translate text to morse code and vice versa.",
        icon: AiOutlineFieldString,
        path: "/morse",
        status: false,
      },
      {
        name: "Binary Translator",
        description: "Translate text to binary and vice versa.",
        icon: AiOutlineFieldBinary,
        path: "/binary",
        status: false,
      },
      {
        name: "Emoji picker",
        description: "Pick emojis.",
        icon: TbMoodSmile,
        path: "/emoji",
        status: false,
      },
      {
        name: "String Obfuscator",
        description: "Obfuscate your strings.",
        icon: TbEyeOff,
        path: "/obfuscator",
        status: false,
      },
      {
        name: "Numeronym Generator",
        description: "Generate numeronyms.",
        icon: MdNumbers,
        path: "/numeronym",
        status: false,
      },
      {
        name: "Text to ASCII Art",
        description: "Convert text to ASCII art.",
        icon: TbCpu,
        path: "/ascii-art",
        status: false,
      },
    ],
  },
  {
    title: "Security Tools",
    path: "/security",
    tools: [
      {
        name: "Token Generator",
        description: "Generate tokens for authentication.",
        icon: TbArrowsShuffle,
        path: "/token",
        status: false,
      },
      {
        name: "Hash Text",
        description: "Hash your text with different algorithms.",
        icon: TbEyeOff,
        path: "/hash",
        status: false,
      },
      {
        name: "Bcrypt Hash Generator",
        description: "Bcrypt hash generator and verifier.",
        icon: BsFileLock,
        path: "/bcrypt",
        status: true,
      },
      {
        name: "UUID Generator",
        description: "Generate UUIDs.",
        icon: TbFingerprint,
        path: "/uuid",
        status: true,
      },
      {
        name: "ULID Generator",
        description: "Generate ULIDs.",
        icon: TbSortDescendingNumbers,
        path: "/ulid",
        status: false,
      },
      {
        name: "Encrypt/Decrypt Text",
        description: "Encrypt and decrypt text.",
        icon: FaLock,
        path: "/encryption",
        status: false,
      },
      {
        name: "BIP39 Passphrase Generator",
        description: "Generate BIP39 passphrases.",
        icon: HiBars3BottomLeft,
        path: "/bip39",
        status: false,
      },
      {
        name: "HMAC Generator",
        description: "Generate HMACs.",
        icon: HiBars2,
        path: "/hmac",
        status: false,
      },
      {
        name: "RSA Key Generator",
        description: "Generate RSA key pairs.",
        icon: TbCertificate,
        path: "/rsa",
        status: false,
      },
      {
        name: "RSA Key Decoder",
        description: "Decode RSA keys.",
        icon: TbCertificateOff,
        path: "/rsa-decoder",
        status: true,
      },
      {
        name: "Password Strength Checker",
        description: "Check your password strength.",
        icon: FaHashtag,
        path: "/password-strength",
        status: false,
      },
      {
        name: "Password Generator",
        description: "Generate passwords.",
        icon: CgPassword,
        path: "/password",
        status: false,
      },
      {
        name: "PDF signature checker",
        description: "Check PDF signatures.",
        icon: TbCertificate2,
        path: "/pdf-signature",
        status: false,
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
        name: "Docker Run To Compose",
        description: "Convert docker run commands to docker-compose.",
        icon: FaDocker,
        path: "/docker-run",
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
        name: "Chmod Calculator",
        description: "Calculate chmod values.",
        icon: AiOutlinePercentage,
        path: "/chmod",
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
        name: "Random port generator",
        description: "Generate random ports.",
        icon: TbServer,
        path: "/port",
        status: false,
      },
      {
        name: "Cron Expression Generator",
        description: "Generate cron expressions.",
        icon: TbAlarm,
        path: "/cron-generator",
        status: false,
      },
    ],
  },
  {
    title: "Network Tools",
    path: "/network",
    tools: [
      {
        name: "IP Address Info",
        description: "Get information about IP addresses.",
        icon: TbRouter,
        path: "/ip",
        status: false,
      },
      {
        name: "DNS Lookup",
        description: "Lookup DNS records.",
        icon: MdOutlineDns,
        path: "/dns",
        status: false,
      },
      {
        name: "Ping Test",
        description: "Test your ping.",
        icon: FaNetworkWired,
        path: "/ping",
        status: false,
      },
      {
        name: "Port Scanner",
        description: "Scan ports.",
        icon: FaPassport,
        path: "/port-scanner",
        status: false,
      },
      {
        name: "IPv4 Subnet Calculator",
        description: "Calculate IPv4 subnets.",
        icon: TbRouter,
        path: "/subnet",
        status: false,
      },
      {
        name: "IPv4 Address Converter",
        description: "Convert IPv4 addresses.",
        icon: TbRouter,
        path: "/ipv4",
        status: false,
      },
      {
        name: "IPv4 Range Expander",
        description: "Expand IPv4 ranges.",
        icon: TbBracketsAngle,
        path: "/range",
        status: false,
      },
      {
        name: "MAC Address Generator",
        description: "Generate MAC addresses.",
        icon: MdPhonelink,
        path: "/mac",
        status: false,
      },
      {
        name: "IPv6 ULA Generator",
        description: "Generate IPv6 ULAs.",
        icon: TbRouter,
        path: "/ula",
        status: false,
      },
    ],
  },
  {
    title: "Math Tools",
    path: "/math",
    tools: [
      {
        name: "Math Evaluator",
        description: "Evaluate math expressions.",
        icon: TbMath,
        path: "/evaluator",
        status: false,
      },
      {
        name: "ETA Calculator",
        description: "Calculate ETA.",
        icon: TbHourglass,
        path: "/eta",
        status: false,
      },
      {
        name: "Percentage Calculator",
        description: "Calculate percentages.",
        icon: TbPercentage,
        path: "/percentage",
        status: false,
      },
    ],
  },
  {
    title: "Measurement Tools",
    path: "/measurement",
    tools: [
      {
        name: "Chronometer",
        description: "Measure time.",
        icon: BsFillStopwatchFill,
        path: "/chronometer",
        status: false,
      },
      {
        name: "Network Speed Test",
        description: "Test your network speed.",
        icon: MdNetworkCheck,
        path: "/speed",
        status: false,
      },
      {
        name: "Benchmark Builder",
        description: "Build benchmarks.",
        icon: MdSpeed,
        path: "/benchmark",
        status: false,
      },
    ],
  },
  {
    title: "Utility Tools",
    path: "/utility",
    tools: [
      {
        name: "Color Picker",
        description: "Pick colors from the color picker or upload an image.",
        icon: CgColorPicker,
        path: "/picker",
        status: false,
      },
    ],
  },
];

export default toolList;
