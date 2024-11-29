require('./services/payments/index'); // This registers the providers first
const { PaymentFactory } = require('./services/payments/factory/PaymentFactory');

console.log('PaymentFactory:', PaymentFactory);

async function processPayment() {
  console.log('Process Payment Called');
  console.log(PaymentFactory);
  const adapter = PaymentFactory.createAdapter('stripe', { apiKey: 'your_api_key' });
  const result = await adapter.processPayment(100, 'USD', { paymentMethodId: 'pm_card_visa' });
  console.log(result);
}

processPayment();
