// config/payment/stripe.js
require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = {
  credentials: {
    secretKey: process.env.STRIPE_SECRET_KEY,
  }
};
