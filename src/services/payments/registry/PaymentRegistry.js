class PaymentRegistry {
    constructor() {
      this.adapters = new Map();
    }
  
    registerProvider(providerName, adapterClass) {
      
      if (this.adapters.has(providerName)) {
        throw new Error(`Provider ${providerName} is already registered.`);
      }
      this.adapters.set(providerName, adapterClass);
    }
  
    getAdapter(providerName, credentials) {
      console.log(`Looking for provider: ${providerName}`);
      const AdapterClass = this.adapters.get(providerName);
      
      if (!AdapterClass) {
        throw new Error(`Provider ${providerName} is not registered.`);
      }
      return new AdapterClass(credentials);
    }
  }
  
  module.exports = new PaymentRegistry();
  