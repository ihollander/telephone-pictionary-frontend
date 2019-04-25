// limit the number of events per second
export const throttle = (fn, delay) => {
  let lastCall = 0;

  return function(...args) {
    const now = new Date().getTime();

    if (now - lastCall < delay) return;

    lastCall = now;
    return fn(...args);
  };
};
