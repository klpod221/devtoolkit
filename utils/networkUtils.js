/**
 * Converts an IPv4 address to its integer representation.
 * @param {string} ip - The IPv4 address.
 * @returns {number} The integer representation.
 */
export const ipToInt = (ip) => {
  return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
};

/**
 * Converts an integer to an IPv4 address.
 * @param {number} int - The integer representation.
 * @returns {string} The IPv4 address.
 */
export const intToIp = (int) => {
  return [
    (int >>> 24) & 0xFF,
    (int >>> 16) & 0xFF,
    (int >>> 8) & 0xFF,
    int & 0xFF
  ].join('.');
};

/**
 * Converts an IPv4 address to binary.
 * @param {string} ip - The IPv4 address.
 * @returns {string} The binary representation.
 */
export const ipToBinary = (ip) => {
  return ip.split('.').map(octet => parseInt(octet, 10).toString(2).padStart(8, '0')).join('.');
};

/**
 * Converts an IPv4 address to hexadecimal.
 * @param {string} ip - The IPv4 address.
 * @returns {string} The hexadecimal representation.
 */
export const ipToHex = (ip) => {
  return ip.split('.').map(octet => parseInt(octet, 10).toString(16).padStart(2, '0')).join('').toUpperCase();
};

/**
 * Validates an IPv4 address.
 * @param {string} ip - The IPv4 address.
 * @returns {boolean} True if valid.
 */
export const isValidIpv4 = (ip) => {
  const parts = ip.split('.');
  if (parts.length !== 4) return false;
  return parts.every(part => {
    const num = parseInt(part, 10);
    return !isNaN(num) && num >= 0 && num <= 255 && part === num.toString();
  });
};
