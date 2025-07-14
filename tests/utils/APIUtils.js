class APIUtils {
 
    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {
        const response = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {data: this.loginPayload});
        const loginResponse = await response.json();
        let token = loginResponse.token;
        return token;
    }

    async createOrder(orderPayload) {

        let token = await this.getToken();
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', 
        {
            data: orderPayload,
            headers: {
                'Authorization': token,
                'Content-type': 'application/json'
            }
        });

    const orderResponseJson = await orderResponse.json();
    let orderId = orderResponseJson.orders[0];
    return orderId;
    }
}

module.exports = {APIUtils}