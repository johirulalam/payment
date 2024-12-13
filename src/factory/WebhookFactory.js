const WebhookRegistry = require('../registry/WebhookRegistry');

class WebhookFactory {
  static createAdapter(headers) {
    return WebhookRegistry.getProvider(headers);
  }
}


module.exports = { WebhookFactory };
