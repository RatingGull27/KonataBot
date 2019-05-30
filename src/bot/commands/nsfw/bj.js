const Command = require('../../structures/BaseCommand');

class bjCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'bj',
            desc: 'bj a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}bj',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/bj');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: ` here is your bj:`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        }
    }
}

module.exports = bjCommand;