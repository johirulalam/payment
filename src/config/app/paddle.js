// config/payment/paddle.js
require('dotenv').config();

module.exports = {
  credentials: {
    sandbox: {
      apiUrl: 'https://sandbox-vendors.paddle.com/api',
      vendorId: process.env.PADDLE_VENDOR_ID,
      vendorAuthCode: process.env.PADDLE_VENDOR_AUTH_CODE,
      publicKey: process.env.PADDLE_PUBLIC_KEY,
    },
    live: {
      apiUrl: 'https://vendors.paddle.com/api',
      vendorId: process.env.PADDLE_VENDOR_ID,
      vendorAuthCode: process.env.PADDLE_VENDOR_AUTH_CODE,
      publicKey: process.env.PADDLE_PUBLIC_KEY,
    },
    webhook_secret: process.env.PADDLE_WEBHOOK_SECRET,
  },

  environment: process.env.PAYMENT_ENVIRONMENT || 'sandbox',
};
