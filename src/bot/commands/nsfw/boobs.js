const Command = require('../../structures/BaseCommand');

class boobsCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'boobs',
            desc: 'boobs a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}boobs',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/boobs');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: ` here is your boobs:`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        }
    }
}

module.exports = boobsCommand;