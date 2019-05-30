const Command = require('../../structures/BaseCommand');

class lesCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'les',
            desc: 'les a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}les',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/les');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: ` here is your les:`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        }
    }
}

module.exports = lesCommand;