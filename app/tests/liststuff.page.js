import { Selector } from 'testcafe';

class ListStuffPage {
  constructor() {
    // Selector for the main container to check if the page is displayed
    this.pageSelector = Selector('.py-3');
  }

  /** Asserts that the ListStuff page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok(); // Check if the page is displayed
  }
}

export const listStuffPage = new ListStuffPage();
