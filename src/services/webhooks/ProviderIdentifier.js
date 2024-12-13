class ProviderIdentifier {
    static identify(headers) {
        if (headers['stripe-signature']) {
            return 'stripe';
        } else if (headers['paypal-transmission-sig']) {
            return 'paypal';
        } else if (headers['paddle-alert-name']) {
            return 'paddle';
        }
        throw new Error("Unable to identify provider from headers.");
    }
}

module.exports = ProviderIdentifier;
