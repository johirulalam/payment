require('./services/payments/index'); // This registers payment providers
require('./services/webhooks/index'); // This registers webhook providers

const { PaymentFactory } = require('./factory/PaymentFactory');
const PaymentProcessor = require('./services/payments/PaymentProcessor');
const WebhookProcessor = require('./services/webhooks/WebhookProcessor');


module.exports = { PaymentFactory,WebhookProcessor };
