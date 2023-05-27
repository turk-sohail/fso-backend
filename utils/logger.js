const info = (...params) => {
  console.log(...params);
};

const appError = (...params) => {
  console.error(...params);
};

module.exports = {
  info,
  appError,
};
