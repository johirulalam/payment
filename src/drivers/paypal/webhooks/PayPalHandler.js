class PayPalHandler {
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
