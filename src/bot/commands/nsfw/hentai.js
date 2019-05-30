const Command = require('../../structures/BaseCommand');

class hentaiCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'hentai',
            desc: 'hentai a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}hentai',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/hentai');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: ` here is your hentai:`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        }
    }
}

module.exports = hentaiCommand;