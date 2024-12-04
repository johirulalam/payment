const PaymentProcessor = require('../../../services/payments/PaymentProcessor');
const config = require('../../../config/app/stripe');
class StripeProcessor extends PaymentProcessor {

  constructor(credentials) {
    super();
    this.stripe = require('stripe')(config.credentials.secretKey);
  }

  // Create payment intent
  async processPayment(payload) {
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

  async customAmountPaymentLinkGenerate(payload) {
    try {

      const paymentLink = await this.stripe.paymentLinks.create({
        line_items: [
          {
            price_data: {
                currency: payload['currency'],
                unit_amount: payload['amount'], /** The amount in cents */
                product_data: {
                    name: payload['product']['title'],
                },
            },
            quantity: payload['quantity'],
          },
        ],
        allow_promotion_codes : payload['is_allow_promotion_code'],
        metadata: payload['metadata'],
        mode: payload['mode'] /** mode will be payment or subscription */

      });

      return {
        paymentLinkUrl: paymentLink.url,
      };

    } catch (error) {
      console.error('custom amount payment link generate:', error);
      throw new Error('custom amount payment link generate.');
    }
  }

  async paymentLinkGenerate(payload) {
    try {

      const paymentLink = await this.stripe.paymentLinks.create({
        line_items: [
          payload['items'] /** here items will be { price : 'price_1QQ1N1AXDYVTcVOpf2CcVw3z' , quantity: 1 } */
        ],
        allow_promotion_codes : payload['is_allow_promotion_code'],
        metadata: payload['metadata'],
        mode: payload['mode'] /** mode will be payment or subscription */
      });

      return {
        paymentLinkUrl: paymentLink.url,
      };
    } catch (error) {
      console.error('Error processing payment:', error);
      throw new Error('Payment processing failed.');
    }
  }

  async payWhatCustomerWant(payload) {
    try {

      /** create product */
      const product = await stripe.products.create({
        name: payload['name'],
      });

      /** create price of the product */
      const price = await stripe.prices.create({
        currency: 'usd',
        custom_unit_amount: {
          enabled: true,
        },
        product: product.id,
      });

      const session = await stripe.checkout.sessions.create({
        cancel_url: payload['cancel_url'],
        line_items: [
          {
            price: price.id,
            quantity: 1, /** always will be 1 */
          },
        ],
        metadata: payload['metadata'],
        mode: 'payment',
        success_url: payload['success_url'],
      });


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
