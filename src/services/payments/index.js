const StripeAdapter = require('../../drivers/stripe/payments/StripeProcessor');
const PaddleAdapter = require('../../drivers/stripe/payments/PayPalProcessor');
const PayPalAdapter = require('../../drivers/stripe/payments/PaddleProcessor');
const paymentAdapterRegistry = require('./registry/PaymentRegistry');
const PaymentAdapterFactory = require('./factory/PaymentFactory');

// Register default adapters
paymentAdapterRegistry.registerProvider('stripe', StripeAdapter);
paymentAdapterRegistry.registerProvider('paddle', PaddleAdapter);
paymentAdapterRegistry.registerProvider('paypal', PayPalAdapter);

module.exports = {
  PaymentAdapterFactory,
  paymentAdapterRegistry, // For custom registration
};
