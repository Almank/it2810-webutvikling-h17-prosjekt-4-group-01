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

  getHomeLink() {
    return element(by.css('.pageTitleContainer'));
  }

  getCloudText() {
    return element(by.css('#cloudText')).getText();
  }

  getCloudIcon() {
    return element(by.css('.cloudIcon')).getText();
  }

  getCloudButton() {
    return element(by.css('.cloudbutton'));
  }

  getCloudTitle() {
    return element(by.css('.cloudtitle')).getText();
  }

  getToggleGridButton() {
    return element(by.css('.viewButton'));
  }

  // Iterate through classes received and checks if the class show is represented.
  getToggledGrid() {
    const show_class = element(by.xpath('/html/body/app-app/movielist/div/div[3]')).getAttribute('class');
    return show_class.then(data => {
      const classes = data.split(' ');
      for (let key in classes) {
        if (classes[key] === 'show') {
          return true;
        }
      }
      return false;
    });
  }

  getToggleFilterButton() {
    return element(by.css('.viewFilter'));
  }

  // Iterate through classes received and checks if the class show is represented.
  getToggledFilters() {
    const show_class = element(by.css('.filterWrapper')).getAttribute('class');
    return show_class.then(data => {
      const classes = data.split(' ');
      for (let key in classes) {
        if (classes[key] === 'showFilterToggle') {
          return true;
        }
      }
      return false;
    });
  }
}
