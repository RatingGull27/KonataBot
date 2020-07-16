class WebhookService {
    constructor(id, token) {
        this.id = "733266897931337778";
        this.token = "so8S-aThQIR99spV6AiTBwxizRoST0ihaWOiDWjzk-NYNc9Hkd5so-aFDftS5IYTst3k";
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
