function init(config) {
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
