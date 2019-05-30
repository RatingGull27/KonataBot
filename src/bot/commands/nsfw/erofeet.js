const Command = require('../../structures/BaseCommand');

class erofeetCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'erofeet',
            desc: 'erofeet a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}erofeet',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/erofeet');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: ` here is your erofeet:`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        }
    }
}

module.exports = erofeetCommand;