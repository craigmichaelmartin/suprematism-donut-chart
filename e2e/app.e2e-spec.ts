import { SuprematismDonutChartPage } from './app.po';

describe('suprematism-donut-chart App', () => {
  let page: SuprematismDonutChartPage;

  beforeEach(() => {
    page = new SuprematismDonutChartPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
