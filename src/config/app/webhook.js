// config/payment/paypal.js
require('dotenv').config();

module.exports = {
  webhook_url: process.env.WEBHOOK_URL,
};
