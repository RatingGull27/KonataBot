const Command = require('../../structures/BaseCommand');

class feetgCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'feetg',
            desc: 'feetg a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}feetg',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/feetg');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: ` here is your feetg:`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        }
    }
}

module.exports = feetgCommand;