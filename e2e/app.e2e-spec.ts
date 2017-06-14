import { SuprematismDonutChartPage } from './app.po';

describe('suprematism-donut-chart example app', () => {
  let page: SuprematismDonutChartPage;

  beforeEach(() => {
    page = new SuprematismDonutChartPage();
  });

  it('should render', () => {
    page.navigateTo();
    expect(page.getRootElement()).toBeDefined();
  });
});
