'use strict';

import { expect } from 'chai';
import { getMainHostName } from '../../src/url';

describe('Test url.js:', function () {
  describe('Method: getMainHostName', function () {
    it('the returned value is normal.', function () {
      const str1 = 'https://www.example.com/test/';
      const str2 = 'http://example.com/test';
      const str3 = 'chrome://extensions';
      const res1 = getMainHostName(str1);
      const res2 = getMainHostName(str2);
      const res3 = getMainHostName(str3);
      expect(res1).to.equal('example.com');
      expect(res2).to.equal('example.com');
      expect(res3).to.equal('');
    });
  });
});
