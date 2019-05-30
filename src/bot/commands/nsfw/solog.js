const Command = require('../../structures/BaseCommand');

class sologCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'solog',
            desc: 'solog a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}solog',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/solog');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: ` here is your solog:`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        }
    }
}

module.exports = sologCommand;