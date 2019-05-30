const Command = require('../../structures/BaseCommand');

class yuriCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'yuri',
            desc: 'yuri a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}yuri',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/yuri');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: ` here is your yuri:`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        }
    }
}

module.exports = yuriCommand;