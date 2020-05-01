require("chromedriver");
let credentials = require("./credentials")
let questions = require("./questions");




let swd = require("selenium-webdriver");
let bldr = new swd.Builder();
let driver = bldr.forBrowser("chrome").build();
(async function () {
    try {
        await driver.manage().setTimeouts({
            implicit: 10000, pageLoad:
                10000
        })
        await driver.get("http://hackerrank.com/login")
        let useridBox = await driver.findElement(swd.By.css("#input-1"))
        await useridBox.sendKeys(credentials.id)
        let passwordidBox = await driver.findElement(swd.By.css("#input-2"))
        await passwordidBox.sendKeys(credentials.password)
        let button = await driver.findElement(swd.By.css("button[type=submit]"))
        await button.click()
        let administration = await driver.findElement(swd.By.css("a[data-analytics=NavBarProfileDropDownAdministration"))

        let challengePageLink = await administration.getAttribute("href")
        await driver.get(challengePageLink)

        let manageTabs = await driver.findElements(swd.By.css(".administration header ul li"))
        await manageTabs[1].click()
        pages = await driver.findElements(swd.By.css("a[data-attr1=Page]"))
        tabs = []
        for (let i = 0; i < pages.length; i++) {
            tabs.push(await pages[i].getAttribute("href"))
        }
        for (let i = 0; i < tabs.length; i++) {
            arr = []
            questions = await driver.findElements(swd.By.css(".backbone.block-center"))

            for (let j = 0; j < questions.length; j++) {
                let questionLink = await questions[j].getAttribute("href")
                arr.push(questionLink)


            }

            for (let j = 0; j < arr.length; j++) {

                await driver.get(arr[j])
                let link = await driver.get(arr[j] + "/moderators");
                inputBox = await driver.findElement(swd.By.css("#moderator"))
                await inputBox.sendKeys("goeljatin99")
                await driver.findElement(swd.By.css(".btn.moderator-save")).click()
                await driver.findElement(swd.By.css(".save-challenge.btn.btn-green")).click()
                await waitForLoader()
                await driver.get(challengePageLink)
                let manageTabs = await driver.findElements(swd.By.css(".administration header ul li"))
                await manageTabs[1].click()



            }
            if (i < tabs.length - 1) {

                await driver.get(tabs[i + 1])
            }
 }
        async function waitForLoader() {
            let loader = await driver.findElement(swd.By.css("#ajax-msg"));
            await driver.wait(swd.until.elementIsNotVisible(loader));
        }

        console.log(questions.length)

        await driver.quit()






    }
    catch (err) {
        console.log(err)
    }


})()

