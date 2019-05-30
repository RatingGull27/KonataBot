const Command = require('../../structures/BaseCommand');

class holoeroCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'holoero',
            desc: 'holoero a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}holoero',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/holoero');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: ` here is your holoero:`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        }
    }
}

module.exports = holoeroCommand;