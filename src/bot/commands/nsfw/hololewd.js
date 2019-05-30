const Command = require('../../structures/BaseCommand');

class hololewdCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'hololewd',
            desc: 'hololewd a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}hololewd',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/hololewd');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: ` here is your hololewd:`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        }
    }
}

module.exports = hololewdCommand;