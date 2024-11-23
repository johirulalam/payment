const axios = require('axios');

class PaddleGateway {
    constructor({ vendorId, vendorAuthCode }) {
        this.vendorId = vendorId;
        this.vendorAuthCode = vendorAuthCode;
        this.baseUrl = 'https://vendors.paddle.com/api/2.0';
    }

    /**
     * Create a checkout URL for a one-time payment or subscription.
     */
    async createPayment(data) {
        const payload = {
            vendor_id: this.vendorId,
            vendor_auth_code: this.vendorAuthCode,
            ...data, // Pass data like product_id, title, prices, etc.
        };

        try {
            const response = await axios.post(`${this.baseUrl}/product/generate_pay_link`, payload);
            return response.data.success ? response.data.response : Promise.reject(response.data.error);
        } catch (error) {
            throw new Error(`Paddle API Error: ${error.message}`);
        }
    }

    /**
     * Handle webhook verification.
     * Paddle uses an HMAC signature to validate webhook requests.
     */
    validateWebhook(body, publicKey) {
        const crypto = require('crypto');
        const signature = body.p_signature;
        const fields = { ...body };
        delete fields.p_signature;

        // Sort fields by key
        const sorted = Object.keys(fields)
            .sort()
            .reduce((acc, key) => {
                acc[key] = fields[key];
                return acc;
            }, {});

        // Serialize to string
        const serialized = Object.values(sorted).map((v) => v.toString()).join('');

        // Verify the signature
        const verifier = crypto.createVerify('RSA-SHA1');
        verifier.update(serialized);
        return verifier.verify(publicKey, Buffer.from(signature, 'base64'));
    }
}

module.exports = PaddleGateway;
