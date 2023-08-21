import { describe, it, beforeEach, after } from "mocha";
import { expect } from "chai";
import { Builder, By, ThenableWebDriver } from "selenium-webdriver";
import { Browser } from "../enums";

const driver: ThenableWebDriver = new Builder()
    .forBrowser(Browser.firefox)
    .usingServer("http://localhost:4444/wd/hub/")
    .build();
const username: string = "lindritkrasniqi";

beforeEach(async (): Promise<void> => { await driver.get(`https://github.com/${username}`); });

after(async (): Promise<void> => { await driver.quit(); });

describe("Test username", (): void => {
    it("Username should match",async (): Promise<void> => {
        const text = await driver.findElement(By.xpath("/html/body/div[1]/div[4]/main/div[2]/div/div[1]/div/div[2]/div[1]/div[2]/h1/span[2]")).getText();
    
        expect(text).equal(username);
    })

    it("Username should not match",async (): Promise<void> => {
        const text = await driver.findElement(By.xpath("/html/body/div[1]/div[4]/main/div[2]/div/div[1]/div/div[2]/div[1]/div[2]/h1/span[2]")).getText();
    
        expect(text).not.equal("text");
    })
});
