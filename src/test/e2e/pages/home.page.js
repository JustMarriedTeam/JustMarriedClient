import Page from './base.page';

export default class HomePage extends Page {

  constructor() {
    super({
      url: '/',
    });
  }

  get signInButton() {
    return browser.element('a[href="#continue"]');
  }

}
