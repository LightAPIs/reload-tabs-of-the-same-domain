'use strict';

function i18n(...args) {
  return chrome.i18n.getMessage(...args);
}

function pageContextMenu(id = '', status = false) {
  if (id) {
    if (status) {
      chrome.contextMenus.create({
        id,
        type: 'normal',
        title: i18n(id),
        contexts: ['page'],
        documentUrlPatterns: ['http://*/*', 'https://*/*', 'file://*/*'],
      });
    } else {
      chrome.contextMenus.remove(id);
    }
  }
}

export { i18n, pageContextMenu };
