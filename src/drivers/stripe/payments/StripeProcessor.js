const PaymentProcessor = require('../../../services/payments/PaymentProcessor');

class StripeProcessor extends PaymentProcessor {
    constructor(credentials) {
      super();
      this.stripe = require('stripe')(credentials.apiKey);
    }
  
    async processPayment(amount, currency, options) {
      return await this.stripe.paymentIntents.create({
        amount: amount * 100,
        currency,
        payment_method: options.paymentMethodId,
        confirm: true,
      });
    }
  
    async refundPayment(transactionId, amount) {
      return await this.stripe.refunds.create({
        payment_intent: transactionId,
        amount: amount * 100,
      });
    }
  }
  
module.exports = StripeProcessor;
  