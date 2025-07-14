import {test, expect, request} from '@playwright/test'
import { APIUtils } from './utils/APIUtils';

// Test to intercept the API response from the server before it is rendered on the UI,
// and injecting our response and rendering on the UI

const loginPayload = {userEmail: "sridharyadav2003@gmail.com",
     userPassword: "Learning@1"};


const orderPayload = {orders: [{country: "India",
         productOrderedId: "67a8dde5c0d3e6622a297cc8"}]}

let token;
let orderId;

let fakePayloadOrders = {data:[],message:"No Orders"};


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

    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/685905c10e7068d39826e737',
       async route => {
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayloadOrders);
            route.fulfill({
                response,
                body
            })
        }
    )
    
    await page.locator('[routerLink*="/dashboard/myorders"]').first().click();
    await page.pause();
})