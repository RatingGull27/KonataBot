const Command = require('../../structures/BaseCommand');

class lewdCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'lewd',
            desc: 'lewd a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}lewd',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/lewd');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: ` here is your lewd:`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        }
    }
}

module.exports = lewdCommand;