class WebhookService {
    constructor(id, token) {
        this.id = "582339274339385345";
        this.token = "yVWw1w6L6-LxEczdVvFyAdbQmpZYn1GCLtnxOxok2ca7P3l9ZWxTKSPbk47Koi2l3yMW";
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