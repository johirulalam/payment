const ProviderIdentifier = require("../services/webhooks/ProviderIdentifier");
class WebhookRegistry {
    constructor() {
        this.adapters = new Map();
    }
    
    registerProvider(providerName, adapterClass) {
    
        if (this.adapters.has(providerName)) {
            throw new Error(`Provider ${providerName} is already registered.`);
        }
        this.adapters.set(providerName, adapterClass);
    }

    getProvider(headers) {

        const providerName = ProviderIdentifier.identify(headers);

        console.log(`Looking for provider: ${providerName}`);
        const AdapterClass = this.adapters.get(providerName);
        
        if (!AdapterClass) {
            throw new Error(`Provider ${providerName} is not registered.`);
        }
        return new AdapterClass();
    }
}

module.exports = new WebhookRegistry();