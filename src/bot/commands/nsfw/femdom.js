const Command = require('../../structures/BaseCommand');

class femdomCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'femdom',
            desc: 'femdom a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}femdom',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/femdom');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: ` here is your femdom:`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        }
    }
}

module.exports = femdomCommand;