const Command = require('../../structures/BaseCommand');

class eronCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'eron',
            desc: 'eron a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}eron',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/eron');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: ` here is your eron:`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        }
    }
}

module.exports = eronCommand;