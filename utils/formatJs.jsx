import beautify from 'js-beautify';

const formatJs = (code, options = {}) => {
  const defaultOptions = {
    indent_size: 4,
    preserve_newlines: true,
    keep_array_indentation: true,
  };

  const beautifyOptions = { ...defaultOptions, ...options };

  return beautify.js(code, beautifyOptions);
};

export default formatJs;
