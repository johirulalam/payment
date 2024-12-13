const paymentRegistry = require('../registry/PaymentRegistry');

class PaymentFactory {
  static createAdapter(provider) {
    return paymentRegistry.getAdapter(provider);
  }
}


module.exports = { PaymentFactory };
