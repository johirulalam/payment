const PaymentProcessor = require('../../../services/products/ProductProcessor');
const config = require('../../../config/app/stripe');

class StripeProductProcessor extends PaymentProcessor {

  constructor(credentials) {
    super();
    this.stripe = require('stripe')(config.credentials.secretKey);
  }


  async createProduct(aproductName, description) {
    try {

        const product = await stripe.products.create({
            name: productName,
            description: productDescription,
        });

        return product;
    } catch (error) {
      console.error('Error processing payment:', error);
      throw new Error('Payment processing failed.');
    }
  }


  async createPrice(amount,currency, productGatewayUid, interval=null) {
    try {
        const priceData = {
            unit_amount: amount,
            currency: currency,
            product: productGatewayUid,
        };
    
        if (interval) {
            priceData.recurring = { interval: interval };
        }
    
        const price = await stripe.prices.create(priceData);

        return price;

    } catch (error) {
      console.log('Error processing refund:', error);
      throw new Error('Refund processing failed.');
    }
  }

}

module.exports = StripeProcessor;
