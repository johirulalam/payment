require('./services/payments/index'); // This registers payment providers
require('./services/webhooks/index'); // This registers webhook providers

const { PaymentFactory } = require('./factory/PaymentFactory');
const PaymentProcessor = require('./services/payments/PaymentProcessor');
const WebhookProcessor = require('./services/webhooks/WebhookProcessor');


const payload = {
    amount: 100,
    currency: 'USD',
    quantity: 1,
    has_price_id: false,
    mode: 'payment',
    success_url: 'https://doplac.com',
    webhook_url: 'https://doplac.com',
};


module.exports = { PaymentFactory,WebhookProcessor };
