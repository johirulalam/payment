// config/payment/paypal.js
require('dotenv').config();

module.exports = {
  credentials: {
    clientId: process.env.PAYPAL_CLIENT_ID,
    clientSecret: process.env.PAYPAL_CLIENT_SECRET
  },

  webhook: process.env.PAYPAL_WEBHOOK_URL,
};
