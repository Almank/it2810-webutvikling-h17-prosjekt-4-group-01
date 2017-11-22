import {browser, by, element} from 'protractor';

export class MainPage {
  navigateTo() {
    return browser.get('/');
  }

  getHeaderTitle() {
    return element(by.css('.pageTitle')).getText();
  }

  getHeaderIcon() {
    return element(by.css('.profileIcon')).getText();
  }

  getUsernameStatus() {
    return element(by.css('#userText')).getText();
  }

  getCloudText() {
    return element(by.css('#cloudText')).getText();
  }

  getCloudIcon() {
    return element(by.css('.cloudIcon')).getText();
  }
}
