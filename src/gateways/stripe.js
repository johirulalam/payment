const stripe = require('stripe');

class StripeGateway {
    constructor(secretKey) {
        this.stripe = stripe(secretKey);
    }

    async createPaymentIntent(amount, currency) {
        return this.stripe.paymentIntents.create({
            amount,
            currency,
        });
    }

    async handleWebhook(event) {
        // Handle Stripe-specific webhook events
        switch (event.type) {
            case 'payment_intent.succeeded':
                return { status: 'success', data: event.data.object };
            case 'payment_intent.failed':
                return { status: 'failed', data: event.data.object };
            default:
                return { status: 'ignored' };
        }
    }
}

module.exports = StripeGateway;
