const Command = require('../../structures/BaseCommand');

class trapCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'trap',
            desc: 'trap a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}trap',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/trap');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: `${msg.author.mention}, here is your trap:`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        }
    }
}

module.exports = trapCommand;