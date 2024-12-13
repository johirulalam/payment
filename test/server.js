const { PaymentFactory } = require('./services/payments/factory/PaymentFactory');

const { PaymentFactory } = require('payment').services.payments.factory;
const { WebhookProcessor } = require('payment').services.payments.processor;

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/pay', async (req, res) => {

    console.log('Received request to /pay');

    payload = {
        amount: 100,
        currency: 'USD',
        quantity: 1,
        has_price_id: false,
        mode: 'payment',
        success_url: 'https://doplac.com',
        webhook_url: 'https://doplac.com'
    }

    // const adapter = PaymentFactory.createAdapter('stripe');
    // const result = await adapter.checkout(payload);

    const adapter = PaymentFactory.createAdapter('paddle');
    const result = await adapter.checkout(payload);

    res.send('Hello World!')
  })

app.post("/webhook", (req, res) => {
    try {
        const processor = new WebhookProcessor(req.headers);

        // Process the payload: validate and transform
        const transformedData = processor.process(req.body, req.headers);

        console.log("Transformed Data:", transformedData);

        res.status(200).send("Webhook processed successfully.");
    } catch (error) {
        console.error("Error processing webhook:", error.message);
        res.status(400).send(error.message);
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})