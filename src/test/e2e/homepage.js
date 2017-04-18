/* eslint-disable */
import { expect } from 'chai';

describe('Homepage', () => {

  it('Page title is JustMarried', () => {
    const title = browser.url('/').getTitle();
    expect(title).to.be.equal('JustMarried');
  });

});

