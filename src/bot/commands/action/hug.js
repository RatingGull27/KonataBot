const Command = require('../../structures/BaseCommand');

class HugCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'hug',
            desc: 'hug a user!',
            usage: 'hug [@mention]',
            category: 'Action',
            examples: [
                '{prefix}hug',
                '{prefix}hug @Melmsie#0002'
            ]
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/hug');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: `<:KonataDreaming:710895044504322099> **|** ${msg.author.mention}: Since your didn't want to hug with someone; You're hugging with me!`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        } else {
                msg.channel.createMessage({ 
                    content: `<:KonataDreaming:710895044504322099> **|** ${msg.author.mention} is hugging <@${msg.mentions[0].id}>`,
                    embed: {
                        image: {
                            url: neko.body.url
                        },
                        color: this.bot.utils.color
                }});
        }
    }
}

module.exports = HugCommand;