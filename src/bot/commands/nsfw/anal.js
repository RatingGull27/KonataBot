const Command = require('../../structures/BaseCommand');

class analCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'anal',
            desc: 'anal a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}anal',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://purrbot.site/api/img/nsfw/anal/gif');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: ` here is your anal:`,
            embed: {
                image: {
                    link: `${link}`
                },
                color: this.bot.utils.color
            }});
        }
    }
}

module.exports = analCommand;