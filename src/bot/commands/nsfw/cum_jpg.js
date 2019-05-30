const Command = require('../../structures/BaseCommand');

class cum_jpgCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'cum_jpg',
            desc: 'cum_jpg a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}cum_jpg',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/cum_jpg');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: ` here is your cum_jpg:`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        }
    }
}

module.exports = cum_jpgCommand;