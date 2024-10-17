const ROMAN_NUMERALS_ARABIC_KEY = {
  1: 'I',
  4: 'IV',
  5: 'V',
  9: 'IX',
  10: 'X',
  40: 'XL',
  50: 'L',
  90: 'XC',
  100: 'C',
  400: 'CD',
  500: 'D',
  900: 'CM',
  1000: 'M',
};

const ROMAN_NUMERALS_ROMAN_KEY = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

/**
 * Convert Arabic to Roman
 * 
 * @param {number} num - Arabic number (1-3999)
 * @returns {string}
 */
export const arabicToRoman = (num) => {
  if (Number.isNaN(num) || num < 1 || num > 3999) {
    throw new Error('Invalid number 1-3999');
  }

  let result = '';

  Object.keys(ROMAN_NUMERALS_ARABIC_KEY).reverse().forEach((value) => {
    while (num >= value) {
      result += ROMAN_NUMERALS_ARABIC_KEY[value];
      num -= value;
    }
  });

  return result;
}

/**
 * Convert Roman to Arabic
 * 
 * @param {string} str - Roman numeral string (I, V, X, L, C, D, M)
 * @returns {number}
 */
export const romanToArabic = (str) => {
  // Check if the string
  if (typeof str !== 'string') {
    throw new Error('Invalid input');
  }

  if (str.length === 0) {
    return null;
  }

  if (!/^[IVXLCDM]+$/.test(str)) {
    throw new Error('Invalid roman numeral string (I, V, X, L, C, D, M)');
  }

  let result = 0;

  for (let i = 0; i < str.length; i++) {
    const current = ROMAN_NUMERALS_ROMAN_KEY[str[i]];
    const next = ROMAN_NUMERALS_ROMAN_KEY[str[i + 1]];

    if (current < next) {
      result += next - current;
      i++;
    } else {
      result += current;
    }
  }

  return result;
}


