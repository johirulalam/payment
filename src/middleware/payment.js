const StripeGateway = require('../gateways/stripe');
const PayPalGateway = require('../gateways/paypal');
const RazorpayGateway = require('../gateways/razorpay');
const PaddleGateway = require('../gateways/paddle');

class PaymentMiddleware {
    constructor(config) {
        this.gateways = {
            stripe: new StripeGateway(config.stripe.secretKey),
            paypal: new PayPalGateway(config.paypal.clientId, config.paypal.clientSecret),
            razorpay: new RazorpayGateway(config.razorpay.keyId, config.razorpay.keySecret),
            paddle: new PaddleGateway({
                vendorId: config.paddle.vendorId,
                vendorAuthCode: config.paddle.vendorAuthCode,
            }),
        };
    }

    async processPayment(req, res, next) {
        const { gateway, ...paymentData } = req.body;

        try {
            const response = await this.gateways[gateway].createPayment(paymentData);
            res.json(response);
        } catch (error) {
            next(error);
        }
    }

    async handleWebhook(req, res, next) {
        const { gateway } = req.params;

        try {
            const event = req.body;
            if (gateway === 'paddle') {
                const isValid = this.gateways.paddle.validateWebhook(event, config.paddle.publicKey);
                if (!isValid) throw new Error('Invalid Paddle webhook signature');
            }

            const response = await this.gateways[gateway].handleWebhook(event);
            res.json(response);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = PaymentMiddleware;
