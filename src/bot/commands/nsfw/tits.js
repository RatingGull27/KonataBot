const Command = require('../../structures/BaseCommand');

class titsCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'tits',
            desc: 'tits a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}tits',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/tits');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: ` here is your tits:`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        }
    }
}

module.exports = titsCommand;