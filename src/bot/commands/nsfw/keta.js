const Command = require('../../structures/BaseCommand');

class ketaCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'keta',
            desc: 'keta a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}keta',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/keta');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: ` here is your keta:`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        }
    }
}

module.exports = ketaCommand;