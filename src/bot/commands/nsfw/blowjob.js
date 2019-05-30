const Command = require('../../structures/BaseCommand');

class blowjobCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'blowjob',
            desc: 'blowjob a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}blowjob',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/blowjob');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: ` here is your blowjob:`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        }
    }
}

module.exports = blowjobCommand;