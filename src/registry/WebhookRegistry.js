class WebhookRegistry {
    static providers = {};

    static registerProvider(providerName, handler) {
        if (this.providers[providerName]) {
            throw new Error(`Webhook provider ${providerName} is already registered.`);
        }
        this.providers[providerName] = handler;
    }

    static getHandler(providerName) {
        const handler = this.providers[providerName];
        if (!handler) {
            throw new Error(`Webhook provider ${providerName} not found.`);
        }
        return handler;
    }
}

module.exports = WebhookRegistry;
