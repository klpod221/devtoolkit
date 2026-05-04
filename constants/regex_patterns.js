export const flagOptions = [
  {
    label: "<b>g</b>lobal",
    value: "g",
  },
  {
    label: "case <b>i</b>nsensitive",
    value: "i",
  },
  {
    label: "<b>m</b>ultiline",
    value: "m",
  },
  {
    label: "<b>s</b>ingle line",
    value: "s",
  },
  {
    label: "<b>u</b>nicode",
    value: "u",
  },
  {
    label: "stick<b>y</b>",
    value: "y",
  },
];

export const commonRegexPatterns = [
  {
    name: "Whole Numbers",
    pattern: `^\\d+$`,
    flags: ["g", "m"],
  },
  {
    name: "Decimal Numbers",
    pattern: `^\\d*\\.\\d+$`,
    flags: ["g", "m"],
  },
  {
    name: "Alphanumeric without spaces",
    pattern: `^[a-zA-Z0-9]+$`,
    flags: ["g", "m"],
  },
  {
    name: "Alphanumeric with spaces",
    pattern: `^[a-zA-Z0-9 ]+$`,
    flags: ["g", "m"],
  },
  {
    name: "Email Address",
    pattern: `^([a-z0-9_\\.\\+-]+)@([\\da-z\\.-]+)\\.([a-z\\.]{2,6})$`,
    flags: ["g", "m"],
  },
  {
    name: "Password (8 char, 1 upper, 1 lower, 1 number, 1 special)",
    pattern: `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$`,
    flags: ["g", "m"],
  },
  {
    name: "Username",
    pattern: `^[a-zA-Z0-9_-]{3,16}$`,
    flags: ["g", "m"],
  },
  {
    name: "URL",
    pattern: `(https?:\\/\\/)?(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#()?&//=]*)`,
    flags: ["g", "m"],
  },
  {
    name: "IPv4 Address",
    pattern: `^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$`,
    flags: ["g", "m"],
  },
  {
    name: "Date (YYYY-MM-DD)",
    pattern: `([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))`,
    flags: ["g", "m"],
  },
  {
    name: "Date (dd-MM-yyyy using separators - / .)",
    pattern: `^(?:(?:31(\\/|-|\\.)(?:0?[13578]|1[02]))\\1|(?:(?:29|30)(\\/|-|\\.)(?:0?[1,3-9]|1[0-2])\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/|-|\\.)0?2\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/|-|\\.)(?:(?:0?[1-9])|(?:1[0-2]))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$`,
    flags: ["g", "m"],
  },
  {
    name: "Date (dd-mmm-YYYY using separators - / .)",
    pattern: `^(?:(?:31(\\/|-|\\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\\1|(?:(?:29|30)(\\/|-|\\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\\2))(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$|^(?:29(\\/|-|\\.)(?:0?2|(?:Feb))\\3(?:(?:(?:1[6-9]|[2-9]\\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\\d|2[0-8])(\\/|-|\\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\\4(?:(?:1[6-9]|[2-9]\\d)?\\d{2})$`,
    flags: ["g", "m"],
  },
  {
    name: "Time (HH:MM 12-hour format)",
    pattern: `^(0?[1-9]|1[0-2]):[0-5][0-9]$`,
    flags: ["g", "m"],
  },
  {
    name: "Time (HH:MM 12-hour format with AM/PM)",
    pattern: `((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))`,
    flags: ["g", "m"],
  },
  {
    name: "Time (HH:MM 24-hour format)",
    pattern: `^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$`,
    flags: ["g", "m"],
  },
  {
    name: "Time (HH:MM 24-hour format optional leading zero)",
    pattern: `^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$`,
    flags: ["g", "m"],
  },
  {
    name: "Time (HH:MM:SS 24-hour format)",
    pattern: `(?:[01]\\d|2[0123]):(?:[012345]\\d):(?:[012345]\\d)`,
    flags: ["g", "m"],
  },
  {
    name: "HTML Tag",
    pattern: `<\\/?[\\w\\s]*>|<.+[\\W]>`,
    flags: ["g", "m"],
  },
  {
    name: "Inline JS",
    pattern: `\\bon\\w+=\\S+(?=.*>)`,
    flags: ["g", "m"],
  },
  {
    name: "Inline JS with element",
    pattern: `(?:<[^>]+\\s)(on\\S+)=["']?((?:.(?!["']?\\s+(?:\\S+)=|[>"']))+.)["']?`,
    flags: ["g", "m"],
  },
  {
    name: "Hex Color",
    pattern: `#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})`,
    flags: ["g", "m"],
  },
  {
    name: "Slug",
    pattern: `^[a-z0-9]+(?:-[a-z0-9]+)*$`,
    flags: ["g", "m"],
  },
  {
    name: "Phone Number with country code",
    pattern: `\\+?[0-9]{1,3}-?[0-9]{3}-?[0-9]{3}-?[0-9]{4}`,
    flags: ["g", "m"],
  },
  {
    name: "Credit Card Number",
    pattern: `\\b(?:\\d[ -]*?){13,16}\\b`,
    flags: ["g", "m"],
  },
];
