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
  },

  environment: process.env.PAYMENT_ENVIRONMENT || 'sandbox',
  
  webhook: process.env.PADDLE_WEBHOOK_URL,
};
