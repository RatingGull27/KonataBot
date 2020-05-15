const Command = require('../../structures/BaseCommand');

class TickleCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'tickle',
            desc: 'tickle a user!',
            usage: 'tickle [@mention]',
            category: 'Action',
            examples: [
                '{prefix}tickle',
                '{prefix}tickle @Melmsie#0002'
            ]
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/tickle');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: `<:KonataDreaming:710895044504322099> **|** ${msg.author.mention}: Since your didn't want to tickle with someone; You're tickling me!`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        } else {
                msg.channel.createMessage({ 
                    content: `<:KonataDreaming:710895044504322099> **|** ${msg.author.mention} is tickling <@${msg.mentions[0].id}>`,
                    embed: {
                        image: {
                            url: neko.body.url
                        },
                        color: this.bot.utils.color
                }});
        }
    }
}

module.exports = TickleCommand;