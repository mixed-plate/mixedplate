import { Selector } from 'testcafe';

class AddStuffPage {
  constructor() {
    // Selector for the main container of the AddStuff page
    this.pageSelector = Selector('.py-3');
  }

  /** Asserts that the AddStuff page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok(); // Check if the page is displayed
  }
}

export const addStuff = new AddStuffPage();
