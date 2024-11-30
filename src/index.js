require('./services/payments/index'); // This registers the providers first
const { PaymentFactory } = require('./services/payments/factory/PaymentFactory');

console.log('PaymentFactory:', PaymentFactory);

async function processPayment() {
  const adapter = PaymentFactory.createAdapter('stripe');
  const result = await adapter.processPayment(100, 'USD', { paymentMethodId: 'pm_card_visa' });
  console.log(result);
}

processPayment();
