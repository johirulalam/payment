const express = require('express');
const bodyParser = require('body-parser');
const { init } = require('payment');

const app = express();
app.use(bodyParser.json());

const payment = init({
    stripe: { secretKey: 'your-stripe-secret' },
    paypal: { clientId: 'your-paypal-client-id', clientSecret: 'your-paypal-client-secret' },
    paddle: {
        vendorId: 'your-paddle-vendor-id',
        vendorAuthCode: 'your-paddle-vendor-auth-code',
        publicKey: 'your-paddle-public-key',
    },
});

app.get('/pay', (req, res, next) => payment.processPayment(req, res, next));
app.post('/webhook/:gateway', (req, res, next) => payment.handleWebhook(req, res, next));

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
