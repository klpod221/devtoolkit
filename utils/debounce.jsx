const debounce = (func, delay) => {
  if (func._timeoutId) {
    clearTimeout(func._timeoutId);
  }

  func._timeoutId = setTimeout(() => {
    func();
  }, delay);
};

export default debounce;
