import {test, expect, request} from '@playwright/test'
import { APIUtils } from './utils/APIUtils';

const loginPayload = {userEmail: "sridharyadav2003@gmail.com",
     userPassword: "Learning@1"};


const orderPayload = {orders: [{country: "India",
         productOrderedId: "67a8dde5c0d3e6622a297cc8"}]}

let token;
let orderId;


test.beforeAll( async () => {
    const apiContext = await request.newContext();
    const apiutils = new APIUtils(apiContext, loginPayload);
    token = await apiutils.getToken();
    orderId = await apiutils.createOrder(orderPayload);
    console.log(token);
    console.log(orderId);
})

test("End-to-End", async ({page}) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto('https://rahulshettyacademy.com/client');

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
    await page.pause();
    expect(orderId.includes(id)).toBeTruthy(); 
    
})