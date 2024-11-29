class PaymentRegistry {
    constructor() {
      this.adapters = new Map();
    }
  
    registerProvider(providerName, adapterClass) {
      
      console.log('xohi')
      if (this.adapters.has(providerName)) {
        throw new Error(`Provider ${providerName} is already registered.`);
      }
      this.adapters.set(providerName, adapterClass);
    }
  
    getAdapter(providerName, credentials) {
      console.log(`Looking for provider: ${providerName}`); // Debugging log
      const AdapterClass = this.adapters.get(providerName);
      console.log(AdapterClass)
      if (!AdapterClass) {
        throw new Error(`Provider ${providerName} is not registered.`);
      }
      return new AdapterClass(credentials);
    }
  }
  
  module.exports = new PaymentRegistry();
  