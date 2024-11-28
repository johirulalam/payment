// services/PayPalProcessor.js
const PaymentProcessor = require('./PaymentProcessor');
const paypal = require('paypal-rest-sdk');
const { paypal: paypalConfig } = require('../config/config');

class PayPalProcessor extends PaymentProcessor {
  constructor() {
    super();
    paypal.configure({
      mode: 'sandbox',
      client_id: paypalConfig.clientId,
      client_secret: paypalConfig.clientSecret,
    });
  }

  async processPayment(amount, currency, paymentDetails) {
    const payment = {
      intent: 'sale',
      payer: { payment_method: 'paypal' },
      transactions: [{ amount: { total: amount, currency } }],
      redirect_urls: paymentDetails.redirectUrls,
    };
    return new Promise((resolve, reject) => {
      paypal.payment.create(payment, (err, payment) => {
        if (err) return reject(err);
        resolve(payment);
      });
    });
  }
}
module.exports = PayPalProcessor;
