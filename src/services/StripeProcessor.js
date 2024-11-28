// services/StripeProcessor.js
const PaymentProcessor = require('./PaymentProcessor');
const Stripe = require('stripe');
const { stripe } = require('../config/config');

class StripeProcessor extends PaymentProcessor {
  constructor() {
    super();
    this.stripe = new Stripe(stripe.apiKey);
  }

  async processPayment(amount, currency, paymentDetails) {
    return this.stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentDetails.methodId,
      confirm: true,
    });
  }
}
module.exports = StripeProcessor;
