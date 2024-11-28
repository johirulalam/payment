const { PaymentAdapterFactory } = require('./services/payments/PaymentProcessor');

async function processPayment() {
  const adapter = PaymentAdapterFactory.createAdapter('stripe', { apiKey: 'your_api_key' });
  const result = await adapter.processPayment(100, 'USD', { paymentMethodId: 'pm_card_visa' });
  console.log(result);
}

processPayment();
