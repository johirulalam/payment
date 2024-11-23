const PaymentMiddleware = require('./middleware/payment');  // Adjust the path if necessary

function init(config) {
    if (!config || !config.stripe || !config.paypal || !config.paddle) {
        throw new Error("Missing required payment gateway configuration");
    }

    const { stripe, paypal, paddle } = config;

    return new PaymentMiddleware({
        stripe: { secretKey: config.stripe.secretKey },
        paypal: { clientId: config.paypal.clientId, clientSecret: config.paypal.clientSecret },
        paddle: {
            vendorId: config.paddle.vendorId,
            vendorAuthCode: config.paddle.vendorAuthCode,
            publicKey: config.paddle.publicKey, // Used for webhook validation
        },
    });
}

module.exports = { init };
