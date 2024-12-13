const crypto = require("crypto");
const WebhookProcessor = require('../../../services/webhooks/WebhookProcessor');

class PaddleHandler extends WebhookProcessor {
    
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

    validate(payload, signature, publicKey) {
        if (!signature || !publicKey) {
            throw new Error("Missing Paddle signature or public key.");
        }

        // Step 1: Sort the data
        const sortedData = Object.keys(payload)
            .sort()
            .reduce((acc, key) => {
                acc[key] = payload[key];
                return acc;
            }, {});

        // Step 2: Convert values to strings
        const stringifiedData = {};
        for (let key in sortedData) {
            if (typeof sortedData[key] === 'object' || Array.isArray(sortedData[key])) {
                continue; // Skip objects and arrays
            }
            stringifiedData[key] = String(sortedData[key]);
        }

        // Step 3: Serialize the data
        const serializedData = new URLSearchParams(stringifiedData).toString(); // Use URLSearchParams or querystring

        // Step 4: Verify the signature using the public key
        const verify = crypto.createVerify('sha1'); // Using sha1 as in the PHP example
        verify.update(serializedData); // Add the serialized data to the verify instance

        // Step 5: Perform verification
        const isVerified = verify.verify(publicKey, Buffer.from(signature, 'base64'));

        if (!isVerified) {
            throw new Error("Invalid Paddle signature.");
        }

        return true; // Signature is valid
    }

    transform(payload) {
        return {
            product_id: payload.product_id,
            title: payload.title,
            price: payload.amount, // Assuming the amount is in cents
            customer_email: payload.customer_email,
            status: payload.status,
            raw: payload,
        };
    }
}

module.exports = PaddleHandler;
