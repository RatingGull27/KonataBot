const Command = require('../../structures/BaseCommand');

class cumCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'cum',
            desc: 'cum a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}cum',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/cum');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: ` here is your cum:`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        }
    }
}

module.exports = cumCommand;