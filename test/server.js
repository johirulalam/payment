// const { PaymentFactory } = require('payment').services.payments.factory;
// const { WebhookProcessor } = require('payment').services.webhooks.processor;

const { PaymentFactory, WebhookProcessor } = require('payment');

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/pay', async (req, res) => {
    try {
        console.log('Received request to /pay');

        const payload = {
            amount: 100,
            currency: 'USD',
            quantity: 1,
            has_price_id: false,
            mode: 'payment',
            success_url: 'https://doplac.com',
            webhook_url: 'https://doplac.com',
        };

        // Use the desired payment adapter
        const adapter = PaymentFactory.createAdapter('stripe'); // Change to 'paddle' if needed
        const result = await adapter.checkout(payload);

        res.status(200).send({
            message: 'Payment processed successfully',
            data: result,
        });
    } catch (error) {
        console.error("Error processing payment:", error.message);
        res.status(500).send({
            error: error.message,
        });
    }
});


app.post('/webhook', express.json(), (req, res) => {
    try {
        console.log('Received webhook request');

        // Initialize the WebhookProcessor with headers
        const processor = new WebhookProcessor(req.headers);

        // Process the payload: validate and transform
        const transformedData = processor.process(req.body, req.headers);

        console.log("Transformed Data:", transformedData);

        res.status(200).send("Webhook processed successfully.");
    } catch (error) {
        console.error("Error processing webhook:", error.message);
        res.status(400).send({
            error: error.message,
        });
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})