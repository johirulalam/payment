const paypal = require('paypal-rest-sdk');

class PayPalGateway {
    constructor(clientId, clientSecret) {
        paypal.configure({
            mode: 'sandbox', // or 'live'
            client_id: clientId,
            client_secret: clientSecret,
        });
    }

    createPayment(amount, currency, returnUrl, cancelUrl) {
        const createPaymentJson = {
            intent: 'sale',
            payer: { payment_method: 'paypal' },
            transactions: [{
                amount: { total: amount, currency },
            }],
            redirect_urls: { return_url: returnUrl, cancel_url: cancelUrl },
        };

        return new Promise((resolve, reject) => {
            paypal.payment.create(createPaymentJson, (error, payment) => {
                if (error) return reject(error);
                resolve(payment);
            });
        });
    }

    handleWebhook(event) {
        // Handle PayPal-specific webhook events
        if (event.event_type === 'PAYMENT.SALE.COMPLETED') {
            return { status: 'success', data: event };
        }
        return { status: 'ignored' };
    }
}

module.exports = PayPalGateway;
