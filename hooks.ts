const expect = require("chai");
import {
  After,
  AfterAll,
  Before,
  BeforeAll,
  HookScenarioResult,
  Status,
  setDefaultTimeout,
} from "cucumber";
// var { setDefaultTimeout } = require("@cucumber/cucumber");

setDefaultTimeout(60 * 1000);

interface World {
  attach: (arg1: string | Buffer, arg2: string) => void;
}

interface TestCase extends HookScenarioResult {
  sourceLocation: {
    uri: string;
    line: number;
  };
  result: {
    duration: number;
    status: Status;
  };
}

BeforeAll(async function (): Promise<void> {});

AfterAll(async function (): Promise<void> {});

Before(async function (testCase: TestCase): Promise<void> {});

After(async function (scenarioResult: HookScenarioResult): Promise<void> {});
