const paymentRegistry = require('../services/registry/PaymentRegistry');

class PaymentFactory {
  static createAdapter(provider) {
    return paymentRegistry.getAdapter(provider);
  }
}


module.exports = { PaymentFactory };
