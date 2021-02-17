import * as chaiAsPromised from "chai-as-promised";
import * as reporter from "cucumber-html-reporter";

import * as fs from "fs-extra";
import * as gulp from "gulp";
import * as merge from "gulp-merge-json";
import * as path from "path";
import { browser, Config } from "protractor";
import * as promiseObject from "q";
import ShortUniqueId from "short-unique-id";
import * as user from "username";

const runID = new ShortUniqueId().randomUUID(13).toUpperCase();

require("dotenv").config();
const cliArg: any = require("yargs").argv;

const mime = require("mime-types");
const json = require("json-file");

export let config: Config = {
  directConnect: true,
  baseUrl: "https://google.com",
  noGlobals: false,
  specs: ["../features/*.feature"],
  logLevel: "INFO",
  SELENIUM_PROMISE_MANAGER: false,
  // baseUrl: 'https://google.com',

  ignoreUncaughtExceptions: true,
  disableChecks: true,

  allScriptsTimeout: 300000, // 5 minutes
  getPageTimeout: 300000, // 5 minutes
  untrackOutstandingTimeouts: false,

  beforeLaunch: async (): Promise<void> => {},

  onPrepare: async (): Promise<any> => {
    browser.waitForAngularEnabled(false);

    await browser.manage().window().maximize();
    browser.driver.getCapabilities().then(function (caps): any {
      browser.browserName = caps.get("browserName");
      browser.browserVersion = caps.get("version");
      browser.platform = caps.get("platform");
    });
  },

  onComplete: async (): Promise<any> => {},

  onCleanUp: async (exitCode: number) => {},

  afterLaunch: async (exitCode: number): Promise<any> => {
    let options: any = {
      theme: "bootstrap",
      jsonFile:
        path.join(__dirname, "/..") + "/reports/json/" + runID + ".json",
      output: path.join(__dirname, "/..") + "/reports/html/" + runID + ".html",
      ignoreBadJsonFile: false,
      name: "QA-ATDD",
      brandTitle: `Feature: Google Search`,
      columnLayout: 1,
      scenarioTimestamp: true,
      storeScreenShots: false,
      reportSuiteAsScenarios: true,
      launchReport: false,
    };
    reporter.generate(options);
  },

  params: {
    timeOut: 300000,
    datapath: path.join(__dirname, "/.."),
  },
  // resultJsonOutputFile: '',
  restartBrowserBetweenTests: false,
  framework: "custom",
  frameworkPath: require.resolve("protractor-cucumber-framework"),
  cucumberOpts: {
    "require-module": `${path.join(
      __dirname,
      "/.."
    )}/node_modules/ts-node/register`,
    monochrome: true,
    strict: true,
    format: [
      "json:" +
        path.join(__dirname, "/..") +
        "/reports/json/" +
        runID +
        ".json",
      `rerun:${path.join(__dirname, "/..")}/reports/html/${runID}@rerun.txt`,
    ],
    keepAlive: true,
    require: [
      path.join(__dirname, "/..") + "/steps/*.ts",
      path.join(__dirname, "/..") + "/test-data/*.json",
      path.join(__dirname, "/..") + "/objects/*.ts",
      path.join(__dirname, "/..") + "/utilities/*.ts",
    ],
  },
};
