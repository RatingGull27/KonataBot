class WebhookService {
    constructor(id, token) {
        this.id = "710438209154318378";
        this.token = "Ij2_A-DF3m7WyAwIIxiRIhOQHB7b5_6KDI4vH3vcH1nes3_AW2EUvsP7V2fVoYlBZyUE";
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
