'use strict';

function getMainHostName(str = '') {
  str = str.trim();
  if (str) {
    const url = new URL(str);
    const { hostname } = url;
    if (hostname.match(/.*?([\w-]+\.[a-z]+)$/i)) {
      return hostname.replace(/.*?([\w-]+\.[a-z]+)$/i, '$1');
    }
    return '';
  }
  return str;
}

export { getMainHostName };
