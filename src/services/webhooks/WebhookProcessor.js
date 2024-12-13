const ProviderIdentifier = require("./ProviderIdentifier");
const paymentRegistry = require("../services/registry/PaymentRegistry");

class WebhookProcessor {
    constructor(headers) {
        // Identify the provider from headers
        const providerName = ProviderIdentifier.identify(headers);

        // Retrieve the handler (adapter) from the registry
        this.handler = paymentRegistry.getAdapter(providerName);
        if (!this.handler) {
            throw new Error(`Unsupported provider: ${providerName}`);
        }
    }

    process(payload, headers) {
        // Validate the payload and headers
        this.handler.validate(payload, headers);

        // Transform the payload
        return this.handler.transform(payload);
    }
}

module.exports = WebhookProcessor;
