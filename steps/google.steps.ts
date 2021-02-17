import { Given, Then } from "cucumber";
import { FonAuto } from "fonauto";
import { BrowserUtil } from "fonauto/lib/browser/browser.util";
import * as fs from "fs-extra";
import { browser, protractor } from "protractor";
const chai = require("chai");
const expect = chai.expect;
import { GooglePage } from "../pages/google.page";
import { ResultsPage } from "../pages/results.page";

const googleHomePage = new GooglePage();
const resultsPage = new ResultsPage();

Given(
  /^Im on google search home "([^"]*)"$/,
  async function (googleUrl: string): Promise<void> {
    await browser.driver.get(googleUrl);
    const currentUrl = await browser.driver.getCurrentUrl();
    expect(currentUrl).to.contain("google");
    await FonAuto.browser.takeScreenshot(this);
  }
);

Then(
  /^I entered search terms as "([^"]*)"$/,

  async function (keyword: string): Promise<void> {
    await googleHomePage.search(keyword);
    const currentUrl = await browser.driver.getCurrentUrl();
    expect(currentUrl).to.contain(keyword);
    await FonAuto.browser.takeScreenshot(this);
  }
);

Then(
  /^I should able to see the search results$/,

  async function (): Promise<void> {
    expect(await resultsPage.resultsCount()).not.equal("");
    await FonAuto.browser.takeScreenshot(this);
  }
);
