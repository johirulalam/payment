class PaymentProcessor {
  processPayment(amount, currency, options) {
    throw new Error("processPayment method must be implemented");
  }

  refundPayment(transactionId, amount) {
    throw new Error("refundPayment method must be implemented");
  }
}

module.exports = PaymentProcessor;
