const StripeHandler = require("./providers/StripeHandler");
const PayPalHandler = require("./providers/PayPalHandler");
const PaddleHandler = require("./providers/PaddleHandler");

const providers = {
    stripe: StripeHandler,
    paypal: PayPalHandler,
    paddle: PaddleHandler,
};

class WebhookProcessor {
    constructor(providerName) {
        const Handler = providers[providerName];
        if (!Handler) {
            throw new Error(`Unsupported provider: ${providerName}`);
        }
        this.handler = new Handler();
    }

    /**
     * Validate the webhook payload and headers.
     */
    validate(payload, headers) {
        return this.handler.validate(payload, headers);
    }

    /**
     * Transform raw webhook data into a common format.
     */
    transform(payload) {
        return this.handler.transform(payload);
    }
}

module.exports = WebhookProcessor;
