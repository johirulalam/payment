const paymentAdapterRegistry = require('../registry/PaymentRegistry');

class PaymentFactory {
  static createAdapter(provider, credentials) {
    return paymentAdapterRegistry.getAdapter(provider, credentials);
  }
}

module.exports = PaymentFactory;
