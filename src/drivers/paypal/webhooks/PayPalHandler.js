const WebhookProcessor = require('../../../services/webhooks/WebhookProcessor');
class PayPalHandler extends WebhookProcessor {

    async process(payload, headers) {
        try {

            
            // Validate the payload and headers
            const isValid = this.validate(payload, headers);
            if (!isValid) {
                throw new Error("Invalid webhook signature");
            }

            // Transform the payload
            return this.transform(payload);
        } catch (error) {
            console.error("Error processing webhook:", error.message);
            throw error; // Re-throw the error to let the caller handle it
        }
    }

    validate(payload, headers) {
        const authHeader = headers["authorization"];
        if (!authHeader) {
            throw new Error("Missing PayPal authorization header.");
        }

        // Example validation logic (using a mock)
        if (authHeader !== process.env.PAYPAL_AUTH) {
            throw new Error("Invalid PayPal authorization.");
        }

        return true;
    }

    transform(payload) {
        return {
            id: payload.id,
            type: payload.event_type,
            timestamp: payload.create_time,
            customer: payload.resource.payer.payer_info.email,
            amount: payload.resource.amount.total,
            currency: payload.resource.amount.currency,
            raw: payload,
        };
    }
}

module.exports = PayPalHandler;
