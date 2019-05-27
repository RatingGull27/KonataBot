class WebhookService {
    constructor(id, token) {
        this.id = "";
        this.token = "";
        this.snek = require('snekfetch');
    }

    async createMessage(content) {
        if (content instanceof Object) {
            this.snek.post(`https://discordapp.com/api/webhooks/${this.id}/${this.token}?wait=true`).send({
                embeds: [
                    content
                ]
            }).end();
        } else {
            this.snek.post(`https://discordapp.com/api/webhooks/${this.id}/${this.token}?wait=true`).send(content).end();
        }
    }
}

module.exports = WebhookService;
