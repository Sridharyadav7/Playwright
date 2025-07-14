import {test, expect} from '@playwright/test'

// Another way of setting the storage settings for browser when there are multiple keys

let newContext;

test.beforeAll(async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('sridharyadav2003@gmail.com');
    await page.locator('#userPassword').fill('Learning@1');
    await page.locator('.btn.btn-block.login-btn').click();
    await page.locator('.card-body b').first().waitFor();

    // Store the context details in a json file 
    await context.storageState({path: 'state.json'});

    // Create a new context with logged-in details using the created json file
    newContext = await browser.newContext({storageState: 'state.json'})
    
})

test.only("End-to-End", async () => {
    // Create a new page with the logged-in context 
    const page = await newContext.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
    const cards = page.locator('.card-body');
    const productName = 'IPHONE 13 PRO';
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