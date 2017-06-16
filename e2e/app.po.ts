import { browser, element, by } from 'protractor';

export class SuprematismDonutChartPage {
  navigateTo() {
    return browser.get('/');
  }

  getRootElement() {
    return element(by.css('supre-root'));
  }
}
