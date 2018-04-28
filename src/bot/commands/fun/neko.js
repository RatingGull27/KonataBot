const Command = require('../../structures/BaseCommand');

class NekoCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'neko',
            desc: 'Get a random neko.',
            usage: 'neko',
            aliases: ['catgirl'],
            examples: ['k;catgirl'],
            category: 'Fun'
        });
    }

    async execute(msg, args) {
        const { body } = await this.bot.snek.get('https://nekos.life/api/neko');

        msg.channel.createMessage({ embed: {
            title: "Konata Izumi » Neko",
            description: `${msg.author.mention}, here is your neko:`,
            image: {
                url: `${body.neko}`
            },
            color: this.bot.utils.color
        }});
    }
}

module.exports = NekoCommand;