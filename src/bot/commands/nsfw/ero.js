const Command = require('../../structures/BaseCommand');

class eroCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'ero',
            desc: 'ero a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}ero',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/ero');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: ` here is your ero:`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        }
    }
}

module.exports = eroCommand;