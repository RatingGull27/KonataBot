const Command = require('../../structures/BaseCommand');

class lewdkemoCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'lewdkemo',
            desc: 'lewdkemo a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}lewdkemo',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/lewdkemo');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: ` here is your lewdkemo:`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        }
    }
}

module.exports = lewdkemoCommand;