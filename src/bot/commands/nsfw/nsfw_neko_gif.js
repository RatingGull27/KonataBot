const Command = require('../../structures/BaseCommand');

class nsfw_neko_gifCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'nsfw_neko_gif',
            desc: 'nsfw_neko_gif a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}nsfw_neko_gif',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/nsfw_neko_gif');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: ` here is your nsfw_neko_gif:`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        }
    }
}

module.exports = nsfw_neko_gifCommand;