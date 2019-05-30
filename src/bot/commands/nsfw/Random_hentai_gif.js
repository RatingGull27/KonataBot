const Command = require('../../structures/BaseCommand');

class Random_hentai_gifCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'Random_hentai_gif',
            desc: 'Random_hentai_gif a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}Random_hentai_gif',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/Random_hentai_gif');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: `${msg.author.mention}, here is your Random_hentai_gif:`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        }
    }
}

module.exports = Random_hentai_gifCommand;