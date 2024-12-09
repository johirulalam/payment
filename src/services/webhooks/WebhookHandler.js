class BaseWebhookHandler {
    constructor() {
        if (new.target === BaseWebhookHandler) {
            throw new Error("BaseWebhookHandler is an abstract class and cannot be instantiated directly.");
        }
    }

    /**
     * To be implemented by the user to handle the transformed data.
     */
    async process(transformedData) {
        throw new Error("process() must be implemented in the child class.");
    }
}

module.exports = BaseWebhookHandler;
