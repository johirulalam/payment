class PaymentProcessor {
    processPayment(amount, currency, options) {
      throw new Error("processPayment method must be implemented");
    }
  
    refundPayment(transactionId, amount) {
      throw new Error("refund Payment method must be implemented");
    }
  }
  
  module.exports = PaymentProcessor;
  