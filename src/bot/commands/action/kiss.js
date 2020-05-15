const Command = require('../../structures/BaseCommand');

class KissCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'kiss',
            desc: 'kiss a user!',
            usage: 'kiss [@mention]',
            category: 'Action',
            examples: [
                '{prefix}kiss',
                '{prefix}kiss @Melmsie#0002'
            ]
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/kiss');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: `<:KonataDreaming:710895044504322099> **|** ${msg.author.mention}: Since your didn't want to kiss with someone; You're kissing me!`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        } else {
                msg.channel.createMessage({ 
                    content: `<:KonataDreaming:710895044504322099> **|** ${msg.author.mention} is kissing <@${msg.mentions[0].id}>`,
                    embed: {
                        image: {
                            url: neko.body.url
                        },
                        color: this.bot.utils.color
                }});
        }
    }
}

module.exports = KissCommand;