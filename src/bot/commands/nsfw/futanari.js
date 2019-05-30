const Command = require('../../structures/BaseCommand');

class futanariCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'futanari',
            desc: 'futanari a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}futanari',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/futanari');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: ` here is your futanari:`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        }
    }
}

module.exports = futanariCommand;