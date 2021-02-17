import { browser, by, element, ElementFinder } from "protractor";
import { FonAuto } from "fonauto";
import { delay } from "q";

export class ResultsPage {
  private reslutsStats: ElementFinder = element(by.id("result-stats"));

  public async resultsCount(): Promise<string> {
    let currentPage = this;
    return await currentPage.reslutsStats.getText();
  }
}
