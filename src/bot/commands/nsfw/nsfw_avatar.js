const Command = require('../../structures/BaseCommand');

class nsfw_avatarCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'nsfw_avatar',
            desc: 'nsfw_avatar a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}nsfw_avatar',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/nsfw_avatar');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: `${msg.author.mention}, here is your nsfw_avatar:`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        }
    }
}

module.exports = nsfw_avatarCommand;