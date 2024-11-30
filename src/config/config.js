require('dotenv').config();

console.log(process.env.PAYPAL_CLIENT_SECRET)
module.exports = {
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY
  },
  paypal: {
    clientId: process.env.PAYPAL_CLIENT_ID,
    clientSecret: process.env.PAYPAL_CLIENT_SECRET
  },
  paddle: {
    vendorId: process.env.PADDLE_VENDOR_ID,
    vendorAuthCode: process.env.PADDLE_VENDOR_AUTH_CODE,
    publicKey: process.env.PADDLE_PUBLIC_KEY
  }
};
