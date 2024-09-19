import { Selector } from 'testcafe';

class AboutUsPage {
  constructor() {
    // Selector for the main container to check if the page is displayed
    this.pageSelector = Selector('#about-us-page');
  }

  /** Asserts that the AboutUs page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok(); // Check if the page is displayed
  }
}

export const aboutUsPage = new AboutUsPage();
