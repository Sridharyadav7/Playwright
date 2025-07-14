const {test, expect} = require('@playwright/test');
const { log } = require('console');
const { options } = require('nodemon/lib/config');

test('Browser context playwright test', async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');
    // console.log(await page.title());
    // await userName.fill('learning');
    // await page.locator('#password').fill('learning');
    // await signIn.click();
    // console.log(await page.locator('[style*=block]').textContent());
    // await expect(page.locator('[style*=block]')).toContainText('Incorrect ');
    await userName.fill('rahulshettyacademy');
    await page.locator('#password').fill('learning');
    await signIn.click();
    // console.log(await cardTitles.first().textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
    
});

test('Page playwright test', async ({page}) => {
    await page.goto('https://google.com');
    await expect(page).toHaveTitle('Google');
})

test('Assignment', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('sridharyadav2003@gmail.com');
    await page.locator('#userPassword').fill('Learning@1');
    await page.locator('.btn.btn-block.login-btn').click();
    // await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();
    const allTitles = await page.locator('.card-body b').allTextContents();
    console.log(allTitles);
})

test('UI Controls', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const dropdown = page.locator('select.form-control');
    const documentLink = page.locator('[href*=documents-request]');
    // await page.pause();
    await userName.fill('rahulshettyacademy');
    await page.locator('#password').fill('learning');
    await page.locator('.radiotextsty').last().click();
    await page.locator('.btn.btn-success').click();
    await dropdown.selectOption('consult');
    await page.locator('#terms').click();
    await signIn.click();
    await expect(page.locator('.radiotextsty').last()).toBeChecked();
    expect(await page.locator('#terms').isChecked());
    await expect(documentLink).toHaveAttribute('class', 'blinkingText');
    // await page.pause();
})

test('Child windows handle', async ({browser}) => {
    const context = await new browser.newContext();
    const page = context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentLink = page.locator('[href*=documents-request]');

    const [newPage] = Promise.all(
        [
            context.waitForEvent('page'),
            documentLink.click()
        ]
    )

});

test.only("End-to-End", async ({page}) => {
    const cards = page.locator('.card-body');
    const productName = 'IPHONE 13 PRO';
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('sridharyadav2003@gmail.com');
    await page.locator('#userPassword').fill('Learning@1');
    await page.locator('.btn.btn-block.login-btn').click();
    await page.locator('.card-body b').first().waitFor();
    const allTitles = await page.locator('.card-body b').allTextContents();
    const count = await cards.count();
    for(let i = 0; i < count; i++){
        if(await cards.nth(i).locator('b').textContent() == productName){
            await cards.nth(i).locator('text=  Add To Cart').click();
            break;
        }
    }
    await page.locator('[routerlink*=cart]').click();
    await page.locator('div li').first().waitFor();
    const bool = await page.locator('h3:has-text("IPHONE 13 PRO")').isVisible();
    expect(bool).toBeTruthy();
    await page.locator('text=Checkout').click();
    await page.locator('[placeholder*=Country]').pressSequentially('ind', {delay: 100});
    const dropdown = page.locator('.ta-results');
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator('button').count();
    for(let i=0; i<optionsCount; i++){
        if(await dropdown.locator('button').nth(i).textContent() === ' India'){
            await dropdown.locator('button').nth(i).click();
            break;
        }
    }

    await page.locator('select.input.ddl').first().selectOption('06');
    await page.locator('select.input.ddl').last().selectOption('26');
    await page.locator('.input.txt').nth(1).fill('233');
    await page.locator('.input.txt').nth(2).fill('SRIDHAR R');
    await page.locator('.input.txt').nth(3).fill('rahulshettyacademy');
    await page.locator('.btn.btn-primary.mt-1').click();
    await expect(page.locator('.user__name [type=text]').first()).toHaveText('sridharyadav2003@gmail.com');
    await page.locator('.action__submit').click();
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    await page.locator('[routerLink*="/dashboard/myorders"]').first().click();
    await page.locator('tbody').waitFor();
    const rows = page.locator('tbody tr');

    
    for(let i=0; i<await rows.count(); i++){
        const rowId = await rows.nth(i).locator('th').textContent();
        if(orderId.includes(rowId)){
            await rows.nth(i).locator('button').first().click();
            break;
        }
    }
    await page.locator('.col-text.-main').waitFor();
    const id = await page.locator('.col-text.-main').textContent();
    expect(orderId.includes(id)).toBeTruthy(); 
    
})

test('Find Order', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('sridharyadav2003@gmail.com');
    await page.locator('#userPassword').fill('Learning@1');
    await page.locator('.btn.btn-block.login-btn').click();
    
})