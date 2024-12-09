const StripeAdapter = require('../../drivers/stripe/payments/StripeProcessor');
const PaddleAdapter = require('../../drivers/paddle/payments/PaddleProcessor');
const PayPalAdapter = require('../../drivers/paypal/payments/PayPalProcessor');
const PaymentRegistry = require('./registry/PaymentRegistry');
const PaymentFactory = require('./factory/PaymentFactory');

// Register default adapters
PaymentRegistry.registerProvider('stripe', StripeAdapter);
PaymentRegistry.registerProvider('paddle', PaddleAdapter);
PaymentRegistry.registerProvider('paypal', PayPalAdapter);

console.log('Payment providers registered.');

module.exports = {
  PaymentFactory,
  PaymentRegistry, // For custom registration
};
