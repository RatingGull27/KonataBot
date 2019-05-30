const Command = require('../../structures/BaseCommand');

class lewdkCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'lewdk',
            desc: 'lewdk a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}lewdk',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/lewdk');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: ` here is your lewdk:`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        }
    }
}

module.exports = lewdkCommand;