/* eslint-disable */
import { expect } from 'chai';
import HomePage from './pages/home.page';

describe('Homepage', () => {

  const homePage = new HomePage();

  beforeEach(() => homePage.open());

  it('Page title is JustMarried', () => {
    const title = browser.url('/').getTitle();
    expect(title).to.be.equal('JustMarried');
  });

  it('Displays home page', () => {
    browser.checkDocument();
  });

  it('Displays login form', () => {
    homePage.signInButton.click();
    browser.checkDocument();
  });

});

