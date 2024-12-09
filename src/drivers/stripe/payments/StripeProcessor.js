const PaymentProcessor = require('../../../services/payments/PaymentProcessor');
const config = require('../../../config/app/stripe');
class StripeProcessor extends PaymentProcessor {

  constructor(credentials) {
    super();
    this.stripe = require('stripe')(config.credentials.secretKey);
  }

  // Create payment intent
  async checkout(payload) {
    try {
      /** Extract payload properties */
      const {
        has_price_id,
        currency,
        amount,
        product,
        quantity,
        is_allow_promotion_code,
        metadata,
        mode,
        success_url,
        cancel_url,
      } = payload;
  
      if (typeof has_price_id === 'undefined') {
        throw new Error('The "has_price_id" property is required.');
      }
      if (typeof success_url === 'undefined') {
        throw new Error('The "success_url" property is required.');
      }
      if (!['payment', 'subscription'].includes(mode)) {
        throw new Error('The "mode" property must be either "payment" or "subscription".');
      }
  
      let line_items;
  
      if (has_price_id) {
        line_items = [
          {
            price: 'price_1QQ1N1AXDYVTcVOpf2CcVw3z', // Replace with actual price ID
            quantity: quantity,
          },
        ];
      } else {
        line_items = [
          {
            price_data: {
              currency: currency,
              unit_amount: amount, // The amount in cents
              product_data: {
                name: product?.title ?? 'default product',
              },
            },
            quantity: quantity,
          },
        ];
      }
  
      // Create a checkout session
      const paymentLink = await this.stripe.checkout.sessions.create({
        // payment_method_types: ['card'], // Add other payment methods as needed
        line_items: line_items,
        allow_promotion_codes: is_allow_promotion_code,
        metadata: metadata,
        mode: mode, // Mode will be 'payment' or 'subscription'
        success_url: success_url ?? 'https://doplac.com',
        cancel_url: cancel_url,
      });
  
      // Return payment link URL
      return {
        paymentLinkUrl: paymentLink.url,
      };
    } catch (error) {
      console.error('Error processing payment:', error.message);
      throw new Error('Payment processing failed.');
    }
  }
  

  async paymentLinkGenerate(payload) {
    try {

      if(payload['has_price_id'] == true){
        line_items = [{
          price: 'price_1QQ1N1AXDYVTcVOpf2CcVw3z',
          quantity: 1,
        }]
      }else{
        line_items = [
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
        ]
      }

      const paymentLink = await this.stripe.paymentLinks.create({
        line_items: line_items,
        allow_promotion_codes : payload['is_allow_promotion_code'],
        metadata: payload['metadata'],
        mode: payload['mode'], /** mode will be payment or subscription */
        success_url: payload['success_url'],
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


