const Command = require('../../structures/BaseCommand');

class cumCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'cum',
            desc: 'cum a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}cum',
            ],
            cooldown: 1
        });
    }

    async execute(msg, args) {
        const m = await msg.channel.createMessage('<:owothink:710895044818763826> **|** Grabbing that cum  picture!');
        const body = await this.bot.snek.get('https://nekos.life/api/v2/img/cum');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: ` here is your cum:`,
            embed: {
                link: {
                    url: body.url
                },
                image: {
                    url: body.url
                },
                color: this.bot.utils.color
            }});
        }
    }
}

module.exports = cumCommand;