'use strict';
import { getMainHostName } from '@/url.js';

function reloadTabs(tab) {
  if (tab) {
    const { url, id } = tab;
    const mainHostName = getMainHostName(url);
    if (mainHostName) {
      chrome.tabs.query(
        {
          windowType: 'normal',
          url: `*://*.${mainHostName}/*`,
          currentWindow: localStorage['currentWindow'] === 'true' ? true : null,
        },
        matchTabs => {
          if (!chrome.runtime.lastError && matchTabs) {
            matchTabs.forEach(mTab => {
              const { id: tabId } = mTab;
              if (localStorage['includeCurrent'] === 'true' || tabId !== id) {
                chrome.tabs.reload(tabId, {
                  bypassCache: localStorage['bypassCache'] === 'true',
                });
              }
            });
          }
        }
      );
    }
  }
}

export { reloadTabs };
