const PaymentProcessor = require('../../../services/payments/PaymentProcessor');

class PayPalProcessor extends PaymentProcessor {
    constructor(credentials) {
      super();
      this.paypal = require('@paypal/checkout-server-sdk');
      const environment = new this.paypal.core.SandboxEnvironment(credentials.clientId, credentials.clientSecret);
      this.client = new this.paypal.core.PayPalHttpClient(environment);
    }
  
    async processPayment(amount, currency, options) {
      const request = new this.paypal.orders.OrdersCreateRequest();
      request.prefer("return=representation");
      request.requestBody({
        intent: "CAPTURE",
        purchase_units: [{ amount: { value: amount.toString(), currency_code: currency } }],
      });
  
      const response = await this.client.execute(request);
      return response.result;
    }
  
    async refundPayment(transactionId, amount) {
      const request = new this.paypal.payments.CapturesRefundRequest(transactionId);
      request.requestBody({ amount: { value: amount.toString() } });
      const response = await this.client.execute(request);
      return response.result;
    }
  }
  
  module.exports = PayPalProcessor;
