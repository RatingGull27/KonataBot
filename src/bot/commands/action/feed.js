const Command = require('../../structures/BaseCommand');

class FeedCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'feed',
            desc: 'feed a user!',
            usage: 'feed [@mention]',
            category: 'Action',
            examples: [
                '{prefix}feed',
                '{prefix}feed @Melmsie#0002'
            ]
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/feed');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: `<:KonataDreaming:438856787513573377> **|** ${msg.author.mention}: Since your didn't want to feed with someone; You're feeding with me!`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        } else {
                msg.channel.createMessage({ 
                    content: `<:KonataDreaming:438856787513573377> **|** ${msg.author.mention} is feeding <@${msg.mentions[0].id}>`,
                    embed: {
                        image: {
                            url: neko.body.url
                        },
                        color: this.bot.utils.color
                }});
        }
    }
}

module.exports = FeedCommand;