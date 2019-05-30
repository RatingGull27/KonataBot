const Command = require('../../structures/BaseCommand');

class feetCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'feet',
            desc: 'feet a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}feet',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/feet');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: ` here is your feet:`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        }
    }
}

module.exports = feetCommand;