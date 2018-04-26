class WebhookService {
    constructor(bot, id, token) {
        this.bot = bot;
        this.id = id;
        this.token = token;
        this.snek = bot._snek;
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