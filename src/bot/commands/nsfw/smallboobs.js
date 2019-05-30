const Command = require('../../structures/BaseCommand');

class smallboobsCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'smallboobs',
            desc: 'smallboobs a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}smallboobs',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/smallboobs');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: ` here is your smallboobs:`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        }
    }
}

module.exports = smallboobsCommand;