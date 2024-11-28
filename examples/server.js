const express = require('express');
const bodyParser = require('body-parser');
const { init } = require('payment');
const config = require('payment/config/config');

const app = express();
app.use(bodyParser.json());

const payment = init({
    stripe: { secretKey: config.stripe.secretKey },
    paypal: { clientId: config.paypal.clientId, clientSecret: config.paypal.clientSecret },
    paddle: {
        vendorId: config.paddle.vendorId,
        vendorAuthCode: config.paddle.vendorAuthCode,
        publicKey: config.paddle.publicKey,
    },
});

app.get('/pay', (req, res, next) => payment.processPayment(req, res, next));
app.post('/webhook/:gateway', (req, res, next) => payment.handleWebhook(req, res, next));

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
