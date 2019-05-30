const Command = require('../../structures/BaseCommand');

class erokemoCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'erokemo',
            desc: 'erokemo a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}erokemo',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/erokemo');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: ` here is your erokemo:`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        }
    }
}

module.exports = erokemoCommand;