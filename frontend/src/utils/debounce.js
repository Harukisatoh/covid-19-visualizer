const debounce =
  (fn, wait = 800, time) =>
  (...args) => {
    clearTimeout(time, (time = setTimeout(() => fn(...args), wait)));
  };

window.debounce = debounce;

export default debounce;
