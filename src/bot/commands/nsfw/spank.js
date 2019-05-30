const Command = require('../../structures/BaseCommand');

class spankCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'spank',
            desc: 'spank a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}spank',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/spank');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: ` here is your spank:`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        }
    }
}

module.exports = spankCommand;