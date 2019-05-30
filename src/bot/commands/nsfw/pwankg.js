const Command = require('../../structures/BaseCommand');

class pwankgCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'pwankg',
            desc: 'pwankg a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}pwankg',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/pwankg');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: ` here is your pwankg:`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        }
    }
}

module.exports = pwankgCommand;