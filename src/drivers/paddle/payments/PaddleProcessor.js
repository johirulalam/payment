const PaymentProcessor = require('../../../services/payments/PaymentProcessor');

class PaddleProcessor extends PaymentProcessor {
    constructor(credentials) {
      super();
      this.vendorId = credentials.vendorId;
      this.apiKey = credentials.apiKey;
    }
  
    async processPayment(amount, currency, options) {
      const response = await fetch("https://vendors.paddle.com/api/2.0/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vendor_id: this.vendorId,
          vendor_auth_code: this.apiKey,
          amount,
          currency,
          ...options,
        }),
      });
      return await response.json();
    }
  
    async refundPayment(transactionId, amount) {
      const response = await fetch("https://vendors.paddle.com/api/2.0/refund", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vendor_id: this.vendorId,
          vendor_auth_code: this.apiKey,
          order_id: transactionId,
          amount,
        }),
      });
      return await response.json();
    }
  }
  
  module.exports = PaddleProcessor;
