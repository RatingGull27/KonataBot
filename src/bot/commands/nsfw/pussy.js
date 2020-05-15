const Command = require('../../structures/BaseCommand');

class pussyCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'pussy',
            desc: 'pussy a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}pussy',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/pussy');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: ` here is your pussy:`,
            embed: {
                image: {
                    url: neko.body.url
            
                },
                color: this.bot.utils.color
            }});
        }
    }
}

module.exports = pussyCommand;