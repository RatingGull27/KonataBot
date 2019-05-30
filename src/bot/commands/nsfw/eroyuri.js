const Command = require('../../structures/BaseCommand');

class eroyuriCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'eroyuri',
            desc: 'eroyuri a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}eroyuri',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/eroyuri');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: ` here is your eroyuri:`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        }
    }
}

module.exports = eroyuriCommand;