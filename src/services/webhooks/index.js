const StripeHandler = require('../../drivers/stripe/webhooks/StripeHandler');
const PaddleHandler = require('../../drivers/paddle/webhooks/PaddleHandler');
const PayPalHandler = require('../../drivers/paypal/webhooks/PayPalHandler');
const WebhookRegistry = require('../../registry/WebhookRegistry');

// Register default adapters
WebhookRegistry.registerProvider('stripe', StripeHandler);
WebhookRegistry.registerProvider('paddle', PaddleHandler);
WebhookRegistry.registerProvider('paypal', PayPalHandler);

console.log('Webhook providers registered.');

module.exports = {
  WebhookRegistry, // For custom registration
};
