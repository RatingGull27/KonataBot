const Command = require('../../structures/BaseCommand');

class pussy_jpgCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'pussy_jpg',
            desc: 'pussy_jpg a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}pussy_jpg',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/pussy_jpg');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: ` here is your pussy_jpg:`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        }
    }
}

module.exports = pussy_jpgCommand;