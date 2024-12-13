const crypto = require("crypto");
const WebhookProcessor = require('../../../services/webhooks/WebhookProcessor');
const config = require('../../../config/app/stripe');
const Stripe = require('stripe');

class StripeHandler extends WebhookProcessor {
    constructor() {
        super();
        this.stripe = new Stripe(config.credentials.secretKey); // Initialize Stripe once in the constructor
    }

    /**
     * Main process method to handle the webhook
     * @param {string} payload - Raw request body as a string or Buffer
     * @param {object} headers - Request headers
     */
    async process(payload, headers) {
        try {
            const signature = headers['stripe-signature'];

            // Validate the payload and headers
            const { isValid, data } = this.validate(payload, signature);
            if (!isValid) {
                throw new Error("Invalid webhook signature");
            }

            console.log('Validated signature');
            // Transform the payload for further processing
            return this.transform(data);
        } catch (error) {
            console.error("Error processing webhook:", error.message);
            throw error; // Re-throw the error to let the caller handle it
        }
    }

    /**
     * Validate the Stripe webhook signature
     * @param {string|Buffer} payload - Raw request body
     * @param {string} signature - Stripe signature header
     * @returns {object} Validation result and parsed event data
     */
    validate(payload, signature) {
        try {
            const secret = config.credentials.webhook_secret;

            // Construct the event using Stripe's SDK
            const event = this.stripe.webhooks.constructEvent(payload, signature, secret);

            // Extract the event object
            const dataObject = event.data.object;

            return {
                isValid: true,
                data: dataObject,
            };
        } catch (error) {
            console.error("Stripe signature validation failed:", error.message);
            return {
                isValid: false,
                data: null,
            };
        }
    }

    /**
     * Transform the validated payload into a desired structure
     * @param {object} payload - Validated webhook payload
     * @returns {object} Transformed data
     */
    transform(payload) {
        console.log("Transformed Payload:", payload);

        return {
            id: payload.id,
            type: payload.type,
            timestamp: payload.created || new Date().toISOString(),
            // customer: payload.data.object.customer,
            // amount: payload.data.object.amount / 100,
            // currency: payload.data.object.currency,
            raw: payload, // Keep the raw payload for logging or debugging
        };
    }
}

module.exports = StripeHandler;
