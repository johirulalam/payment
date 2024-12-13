const { PaymentFactory, WebhookFactory } = require('sayed-payment');

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
            success_url: 'https://479e-27-147-224-104.ngrok-free.app/',
            webhook_url: 'https://479e-27-147-224-104.ngrok-free.app/',
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


app.post("/webhook", express.raw({ type: 'application/json' }), async (req, res) => {
    try {

        
        console.log("Received webhook request:", {
            headers: req.headers,
            body: req.body,
        });

        // const stripeSignature = req.headers['stripe-signature'];
        // console.log("Stripe Signature:", stripeSignature);

        // Initialize the WebhookProcessor with headers
        const adapter = WebhookFactory.createAdapter(req.headers);

        // Process the payload: validate and transform
        const transformedData = await adapter.process(req.body, req.headers);

        console.log("Transformed Data:", transformedData);

        // Send a structured response
        res.status(200).json({
            success: true,
            message: "Webhook processed successfully.",
            data: transformedData,
        });
    } catch (error) {
        console.error("Error processing webhook:", {
            message: error.message,
            stack: error.stack,
        });

        // Send a structured error response
        res.status(400).json({
            success: false,
            error: {
                message: error.message,
            },
        });
    }
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})