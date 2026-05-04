/**
 * Generates a random MAC address.
 * @param {boolean} isUnicast - Whether to ensure the address is unicast.
 * @returns {string} The generated MAC address in format XX:XX:XX:XX:XX:XX.
 */
export const generateMacAddress = (isUnicast = true) => {
  const hexDigits = "0123456789ABCDEF";
  let mac = "";
  for (let i = 0; i < 6; i++) {
    let firstByte = hexDigits[Math.floor(Math.random() * 16)] + hexDigits[Math.floor(Math.random() * 16)];
    
    // For the first byte, handle unicast/multicast bit if needed
    if (i === 0 && isUnicast) {
      // Ensure the least significant bit of the first byte is 0 for unicast
      let val = parseInt(firstByte, 16);
      val = val & 0xFE; 
      firstByte = val.toString(16).toUpperCase().padStart(2, '0');
    }
    
    mac += firstByte;
    if (i < 5) mac += ":";
  }
  return mac;
};

/**
 * Generates a random port number.
 * @param {number} min - Minimum port number.
 * @param {number} max - Maximum port number.
 * @returns {number} The generated port number.
 */
export const generateRandomPort = (min = 1024, max = 65535) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Calculates chmod permissions.
 * @param {Object} permissions - An object representing the permissions for owner, group, and others.
 * @returns {string} The octal representation of the permissions (e.g., "755").
 */
export const calculateChmod = (permissions) => {
  const calc = (p) => {
    let val = 0;
    if (p.read) val += 4;
    if (p.write) val += 2;
    if (p.execute) val += 1;
    return val;
  };

  return `${calc(permissions.owner)}${calc(permissions.group)}${calc(permissions.others)}`;
};

/**
 * Converts octal chmod to string representation (e.g., "755" -> "rwxr-xr-x").
 * @param {string} octal - The octal string.
 * @returns {string} The string representation.
 */
export const octalToSymbolic = (octal) => {
  const map = ["---", "--x", "-w-", "-wx", "r--", "r-x", "rw-", "rwx"];
  return octal.split("").map((digit) => map[parseInt(digit, 10)]).join("");
};
