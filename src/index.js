require('./services/payments/index'); // This registers the providers first
const { PaymentFactory } = require('./services/payments/factory/PaymentFactory');

console.log('PaymentFactory:', PaymentFactory);

async function processPayment() {

  payload = {
    amount: 100,
    currency: 'USD',
    quantity: 1,
    has_price_id: false,
    mode: 'payment',
    success_url: 'https://doplac.com',
    webhook_url: 'https://doplac.com'
    
  }
  // const adapter = PaymentFactory.createAdapter('stripe');
  // const result = await adapter.checkout(payload);

  const adapter = PaymentFactory.createAdapter('paddle');
  const result = await adapter.checkout(payload);


  console.log(result);
}

processPayment();
