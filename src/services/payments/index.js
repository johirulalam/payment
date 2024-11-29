const StripeAdapter = require('../../drivers/stripe/payments/StripeProcessor');
const PaddleAdapter = require('../../drivers/paypal/payments/PayPalProcessor');
const PayPalAdapter = require('../../drivers/paddle/payments/PaddleProcessor');
const paymentRegistry = require('./registry/PaymentRegistry');
const PaymentFactory = require('./factory/PaymentFactory');

// Register default adapters
paymentRegistry.registerProvider('stripe', StripeAdapter);
paymentRegistry.registerProvider('paddle', PaddleAdapter);
paymentRegistry.registerProvider('paypal', PayPalAdapter);

console.log('Payment providers registered.');

module.exports = {
  PaymentFactory,
  paymentRegistry, // For custom registration
};
