require('./services/payments/index'); // This registers the providers first
const { PaymentFactory } = require('./services/payments/factory/PaymentFactory');

console.log('PaymentFactory:', PaymentFactory);

async function processPayment() {
  const adapter = PaymentFactory.createAdapter('stripe', { apiKey: 'sk_test_51NciNVAXDYVTcVOpP68uFPue34tWck3JxWb80vhizYIKXM0y7P17IbdTKAV5JCe8R8H6YGn0j9mkDxqfGsRUHPrr00MaC97vaJ' });
  const result = await adapter.processPayment(100, 'USD', { paymentMethodId: 'pm_card_visa' });
  console.log(result);
}

processPayment();
