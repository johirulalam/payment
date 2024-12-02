class PaymentProcessor {
    createProduct(productDetails) {
        throw new Error('createProduct method not implemented for this provider.');
    }

    createPrice(priceDetails) {
    throw new Error('createPrice method not implemented for this provider.');
    }

    createSubscriptionPlan(subscriptionDetails) {
    throw new Error('createSubscriptionPlan method not implemented for this provider.');
    }
  }
  
  module.exports = PaymentProcessor;
  