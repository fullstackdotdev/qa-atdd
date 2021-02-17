import { Given, Then } from "cucumber";
import { FonAuto } from "fonauto";
import { BrowserUtil } from "fonauto/lib/browser/browser.util";
import * as fs from "fs-extra";
import { browser, protractor } from "protractor";
const chai = require("chai");
const expect = chai.expect;
import axios from "axios";

Given(
  /^Im perform GET request for "([^"]*)", I should able to receive posts results$/,
  async function (endpoint: string): Promise<void> {
    const posts = await axios.get(endpoint);
    expect(posts.data.length).to.not.equal(0);
  }
);
