const Command = require('../../structures/BaseCommand');

class erokCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'erok',
            desc: 'erok a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}erok',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/erok');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: ` here is your erok:`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        }
    }
}

module.exports = erokCommand;