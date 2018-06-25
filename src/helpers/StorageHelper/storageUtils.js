// Memoize the result for faster response
const expirationSuffix = '_timestamp';
const units = 60 * 1000;
const radix = 10;

function currentTime() {
  return Math.floor(new Date().getTime() / units);
}

function getItem(key) {
  return window.localStorage.getItem(key);
}

function setItem(key, value) {
  window.localStorage.removeItem(key);
  window.localStorage.setItem(key, value);
}

function removeItem(key) {
  window.localStorage.removeItem(key);
}

function expirationKey(key) {
  return key + expirationSuffix;
}

export { radix, expirationSuffix, currentTime, getItem, setItem, removeItem, expirationKey };
