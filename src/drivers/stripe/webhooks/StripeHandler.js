const crypto = require("crypto");

class StripeHandler {
    validate(payload, headers) {
        const signature = headers["stripe-signature"];
        const secret = process.env.STRIPE_SECRET;

        if (!signature || !secret) {
            throw new Error("Missing Stripe signature or secret.");
        }

        // Example validation logic
        const expectedSignature = crypto.createHmac("sha256", secret).update(payload).digest("hex");
        if (signature !== expectedSignature) {
            throw new Error("Invalid Stripe signature.");
        }

        return true;
    }

    transform(payload) {
        return {
            id: payload.id,
            type: payload.type,
            timestamp: payload.created || new Date().toISOString(),
            customer: payload.data.object.customer,
            amount: payload.data.object.amount / 100,
            currency: payload.data.object.currency,
            raw: payload,
        };
    }
}

module.exports = StripeHandler;
