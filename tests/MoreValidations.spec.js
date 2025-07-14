import {test, expect} from '@playwright/test'

test('Pop up Validations', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
    await page.locator('#confirmbtn').click();
    page.on('dialog', dialog => dialog.accept());
    await page.pause();
    await page.locator('#mousehover').hover();
    const framesPage = page.frameLocator('#courses-iframe');
    await framesPage.locator('li a[href*=lifetime-access]:visible').click();
    const textCheck = await framesPage.locator('.text h2').textContent();
    // console.log(textCheck.split(" ")[1]);
})

test('Screenshot and Visual comparison', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#displayed-text').screenshot({page: 'partialScreenshot.png'});
    await page.locator('#hide-textbox').click();
    await page.screenshot({path: 'screenshot.png'});
    await expect(page.locator('#displayed-text')).toBeHidden();
})

test.only('Visual', async ({page}) => {
    await page.goto('https://www.flightaware.com/');
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
})