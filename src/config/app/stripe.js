const { webhook_secret } = require('./paypal');

// config/payment/stripe.js
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = {
  credentials: {
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhook_secret: process.env.STRIPE_WEBHOOK_SECRET,
  },

};
