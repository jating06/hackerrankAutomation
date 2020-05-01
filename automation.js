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
        let challengePageLink=await administration.getAttribute("href")
       await driver.get( challengePageLink)
       

        for (let i = 0; i < questions.length; i++) {
            let keys=Object.keys(questions[i])
            
            await FillChallengeDetails(questions[i],keys);
            await waitForLoader();
           await driver.get(challengePageLink)
        }
      
     




        async function IncreaseDivHeight(ele, selector, data) {
            let Parent = await driver.findElement(swd.By.css(selector));
            driver.executeScript("arguments[0].style.height='10px'", Parent)
            ele.sendKeys(data)
        }

        async function FillChallengeDetails(data,keys) {
            let manageTabs = await driver.findElements(swd.By.css(".administration header ul li"))
            await manageTabs[1].click()
            await driver.findElement(swd.By.css(".btn.btn-green.backbone.pull-right")).click()
            let arr = ["#name", ".description", "#problem_statement-container .CodeMirror textarea", "#input_format-container .CodeMirror textarea", "#constraints-container .CodeMirror textarea ", "#output_format-container .CodeMirror textarea", "#tags_tag"];
            arr = arr.map(ele => {
                return driver.findElement(swd.By.css(ele))
            })
    
            arr = await Promise.all(arr);
            arr[0].sendKeys(data[keys[0]])
            arr[1].sendKeys(data[keys[1]])
            IncreaseDivHeight(arr[2], "#problem_statement-container .CodeMirror div", data[keys[2]])
            IncreaseDivHeight(arr[3], "#input_format-container .CodeMirror div", data[keys[3]])
            IncreaseDivHeight(arr[4], "#constraints-container .CodeMirror div", data[keys[4]])
            IncreaseDivHeight(arr[5], "#output_format-container .CodeMirror div", data[keys[5]])
            await arr[6].sendKeys(data[keys[6]])
            await arr[6].sendKeys(swd.Key.ENTER)
            await driver.findElement(swd.By.css(".save-challenge.btn.btn-green")).click()
        }
        async function waitForLoader() {
            let loader = await driver.findElement(swd.By.css("#ajax-msg"));
            await driver.wait(swd.until.elementIsNotVisible(loader));
          }




    }
    catch (err) {
        console.log(err)
    }


})()

