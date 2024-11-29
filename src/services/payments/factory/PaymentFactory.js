const paymentRegistry = require('../registry/PaymentRegistry');

class PaymentFactory {
  static createAdapter(provider, credentials) {
    return paymentRegistry.getAdapter(provider, credentials);
  }
}


module.exports = { PaymentFactory };
