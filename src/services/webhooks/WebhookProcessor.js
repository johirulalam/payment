class WebhookProcessor {

    process(payload, headers) {
        throw new Error("process webhook method must be implemented");
    }

    validate(payload, headers) {
        throw new Error("validate webhook webhook method must be implemented");
    }
    
    transform(payload) {
        throw new Error("transform webhook method must be implemented");
    }
}

module.exports = WebhookProcessor;
