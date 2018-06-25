import { radix, expirationSuffix, currentTime, getItem, setItem, removeItem, expirationKey } from './storageUtils';

// Memoize the result for faster response
let isPrivate = null;
/**
 * @description: memoized function to check if the browser is in Private mode.
 * This is required because setItem, in private mode, on Safari throws error
 * @returns boolean
 */
function isPrivateBrowse() {
  // if (__SERVER__) return true;
  if (isPrivate === null) {
    const storageTestKey = 'sTest';
    const storage = window.localStorage;
    try {
      storage.setItem(storageTestKey, 'test');
      storage.removeItem(storageTestKey);
      isPrivate = false;
    } catch (e) {
      isPrivate = true;
    }
  }
  return isPrivate;
}

function flushExpiredItem(key) {
  const exprKey = expirationKey(key);
  const expr = getItem(exprKey);

  if (expr) {
    const expirationTime = parseInt(expr, radix);

    // Check if we should actually kick item out of storage
    if (currentTime() >= expirationTime) {
      removeItem(key);
      removeItem(exprKey);
      return true;
    }
  }

  return false;
}

function flushItem(key) {
  const exprKey = expirationKey(key);

  removeItem(key);
  removeItem(exprKey);
}

const flushExpired = () => {
  if (isPrivateBrowse()) return;

  const keys = Object.keys(localStorage).filter(key => !key.includes(expirationSuffix));
  keys.forEach(key => {
    flushExpiredItem(key);
  });
};

const set = (key, value, time) => {
  if (isPrivateBrowse()) return;

  const stringifyValue = JSON.stringify(value);
  try {
    setItem(key, stringifyValue);
  } catch (e) {
    return;
  }

  if (time) {
    setItem(expirationKey(key), (currentTime() + time).toString(radix));
  } else {
    // In case they previously set a time, remove that info from localStorage.
    removeItem(expirationKey(key));
  }
};

const get = key => {
  if (isPrivateBrowse()) return null;

  if (flushExpiredItem(key)) {
    return null;
  }

  const value = getItem(key);

  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};

const remove = key => {
  if (isPrivateBrowse()) return;

  flushItem(key);
};

const storage = {
  isPrivateBrowse,
  get,
  set,
  remove,
  flushExpired,
  flushExpiredItem,
  flushItem
};

export default storage;
