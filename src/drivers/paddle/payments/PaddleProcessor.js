const paddleConfig = require('../../../config/app/paddle');
const PaymentProcessor = require('../../../services/payments/PaymentProcessor');

class PaddleProcessor extends PaymentProcessor {
    constructor() {
      super();

      const environment = paddleConfig.environment;
      const credentials = paddleConfig.credentials[environment];

      console.log(credentials.apiUrl);
      this.vendorId = credentials.vendorId;
      this.vendorAuthCode = credentials.vendorAuthCode;
      this.apiUrl = credentials.apiUrl;
      this.publicKey = credentials.publicKey;
    }
  
     /**
     * https://developer.paddle.com/api-reference/product-api/pay-links/createpaylink
     */

    async checkout(payload) {
      try {
        const {
          has_price_id,
          currency,
          amount,
          product,
          quantity,
          is_allow_promotion_code,
          metadata,
          mode,
          success_url,
          cancel_url,
          webhook_url,
        } = payload;
    
        const prices = [`${currency}:${amount}`];

        // Construct the body payload for the request
        const requestBody = {
          vendor_id: this.vendorId,
          vendor_auth_code: this.vendorAuthCode,
          title: product?.title || "Default Product Title",
          webhook_url: webhook_url,
          prices: [
            "USD:19.99",
            "EUR:15.99"
          ], // Ensure proper formatting
          return_url: success_url ,
        };
    
        // Optional fields
        // if (quantity) requestBody.quantity = quantity;
        // if (metadata) requestBody.metadata = metadata;
    
        // Make the API request
        const response = await fetch(`${this.apiUrl}/2.0/product/generate_pay_link`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        });
    
        // Check if the response is okay
        if (!response.ok) {
          throw new Error(
            `Failed to generate payment link: ${response.status} - ${response.statusText}`
          );
        }
    
        // Parse the response as JSON
        const data = await response.json();
    
        return data;
      } catch (error) {
        console.error("Error during checkout:", error);
        throw error; // Re-throw the error for further handling
      }
    }
    
  
    async refundPayment(transactionId, amount) {
      const response = await fetch(this.apiUrl+"/2.0/refund", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vendor_id: this.vendorId,
          vendor_auth_code: this.apiKey,
          order_id: transactionId,
          amount,
        }),
      });
      return await response.json();
    }
  }
  
  module.exports = PaddleProcessor;
