// config/payment/paddle.js
require('dotenv').config();

module.exports = {
  credentials: {
    vendorId: process.env.PADDLE_VENDOR_ID,
    vendorAuthCode: process.env.PADDLE_VENDOR_AUTH_CODE,
    publicKey: process.env.PADDLE_PUBLIC_KEY
  }
};
