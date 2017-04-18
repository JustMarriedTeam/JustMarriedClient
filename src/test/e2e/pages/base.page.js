import merge from 'lodash/merge';

export default class BasePage {

  constructor({ url }) {
    merge(this, {
      url
    });
  }

  open() {
    browser.url(this.url);
  }

}
