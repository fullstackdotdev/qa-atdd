import { browser, by, element, ElementFinder } from "protractor";
import { FonAuto } from "fonauto";
import { delay } from "q";

export class GooglePage {
  private searchBox: ElementFinder = element(by.name("q"));
  private searchButton: ElementFinder = element(by.name("btnK"));

  public async search(keyword: string): Promise<void> {
    let currentPage = this;
    await FonAuto.helper.slowType(currentPage.searchBox, keyword);
    return await currentPage.searchButton.click();
  }
}
