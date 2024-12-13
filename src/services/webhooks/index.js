const StripeHandler = require('../../drivers/stripe/webhooks/StripeHandler');
const PaddleHandler = require('../../drivers/paddle/webhooks/PaddleHandler');
const PayPalHandler = require('../../drivers/paypal/webhooks/PayPalHandler');
const PaymentRegistry = require('../../registry/PaymentRegistry');
const PaymentFactory = require('../../factory/PaymentFactory');

// Register default adapters
PaymentRegistry.registerProvider('stripe', StripeHandler);
PaymentRegistry.registerProvider('paddle', PaddleHandler);
PaymentRegistry.registerProvider('paypal', PayPalHandler);

console.log('Payment providers registered.');

module.exports = {
  PaymentFactory,
  PaymentRegistry, // For custom registration
};
