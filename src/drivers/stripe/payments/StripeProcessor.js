const PaymentProcessor = require('../../../services/payments/PaymentProcessor');

class StripeProcessor extends PaymentProcessor {

  constructor(credentials) {
    super();
    this.stripe = require('stripe')(credentials.apiKey);
  }

  // Create payment intent
  async processPayment(amount, currency, options) {
    try {

      // Optionally create a payment link to complete the payment
      const paymentLink = await this.stripe.paymentLinks.create({
        line_items: [{
          price: 'price_1QQ1N1AXDYVTcVOpf2CcVw3z',
          quantity: 1,
        }],
      });


      // Return payment link URL
      return {
        paymentLinkUrl: paymentLink.url,
      };
    } catch (error) {
      console.error('Error processing payment:', error);
      throw new Error('Payment processing failed.');
    }
  }

  // Refund payment
  async refundPayment(transactionId, amount) {
    try {
      const refund = await this.stripe.refunds.create({
        payment_intent: transactionId,
        amount: amount * 100,  // Refund amount in cents
      });
      return refund;
    } catch (error) {
      console.log('Error processing refund:', error);
      throw new Error('Refund processing failed.');
    }
  }
}

module.exports = StripeProcessor;
