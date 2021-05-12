'use strict';
import { i18n, pageContextMenu } from '@/ui.js';
import { reloadTabs } from '@/reload.js';

chrome.runtime.onInstalled.addListener(() => {
  const menus = ['bypassCache', 'includeCurrent', 'currentWindow', 'pageContext'];
  menus.forEach(menu => {
    chrome.contextMenus.create({
      id: menu,
      type: 'checkbox',
      checked: localStorage[menu] === 'true',
      title: i18n(menu),
      contexts: ['browser_action'],
    });
  });

  if (localStorage['pageContext'] === 'true') {
    pageContextMenu('pageReload', true);
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!chrome.runtime.lastError && info) {
    const { menuItemId, checked, wasChecked } = info;
    switch (menuItemId) {
      case 'bypassCache':
      case 'includeCurrent':
      case 'currentWindow':
        localStorage.setItem(menuItemId, checked.toString());
        break;
      case 'pageContext':
        localStorage.setItem(menuItemId, checked.toString());
        if (checked !== wasChecked) {
          pageContextMenu('pageReload', checked);
        }
        break;
      case 'pageReload':
        reloadTabs(tab);
        break;
    }
  }
});

chrome.browserAction.onClicked.addListener(tab => {
  if (!chrome.runtime.lastError) {
    reloadTabs(tab);
  }
});
