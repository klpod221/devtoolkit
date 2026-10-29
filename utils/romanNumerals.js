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
  if (typeof num !== "number" || !Number.isInteger(num) || num < 1 || num > 3999) {
    throw new Error('Invalid number. Must be an integer between 1 and 3999.');
  }

  let result = '';

  Object.keys(ROMAN_NUMERALS_ARABIC_KEY).reverse().forEach((value) => {
    while (num >= Number(value)) {
      result += ROMAN_NUMERALS_ARABIC_KEY[value];
      num -= Number(value);
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
  if (typeof str !== 'string') {
    throw new Error('Invalid input');
  }

  const clean = str.trim().toUpperCase();
  if (clean.length === 0) {
    return null;
  }

  if (!/^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/.test(clean)) {
    throw new Error('Invalid roman numeral string format');
  }

  let result = 0;

  for (let i = 0; i < clean.length; i++) {
    const current = ROMAN_NUMERALS_ROMAN_KEY[clean[i]];
    const next = ROMAN_NUMERALS_ROMAN_KEY[clean[i + 1]];

    if (next && current < next) {
      result += next - current;
      i++;
    } else {
      result += current;
    }
  }

  return result;
}


