import { Ng2MultiSelectorPage } from './app.po';

describe('ng2-multi-selector App', () => {
  let page: Ng2MultiSelectorPage;

  beforeEach(() => {
    page = new Ng2MultiSelectorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
