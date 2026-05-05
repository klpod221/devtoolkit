const UPPERCASE_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE_LETTERS = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';

export const randomString = (length = 8, options = {}) => {
  const { uppercase = true, lowercase = true, numbers = true } = options;
  
  let charSet = '';

  if (uppercase) charSet += UPPERCASE_LETTERS;
  if (lowercase) charSet += LOWERCASE_LETTERS;
  if (numbers) charSet += NUMBERS;

  let result = '';
  for (let i = 0; i < length; i++) {
    result += charSet.charAt(Math.floor(Math.random() * charSet.length));
  }

  return result;
};

export default randomString;
