import {test} from '@playwright/test'

test('Security test request intercept', async ({page}) => {
    
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('sridharyadav2003@gmail.com');
    await page.locator('#userPassword').fill('Learning@1');
    await page.locator('.btn.btn-block.login-btn').click();
    await page.locator('.card-body b').first().waitFor();
  
    await page.locator('[routerLink*="/dashboard/myorders"]').first().click();
    await page.locator('tbody').waitFor();

    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
        route => route.continue({url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=23fkfek'})
    )

    await page.locator('button:has-text("View")').first().click();
    await page.pause();
})