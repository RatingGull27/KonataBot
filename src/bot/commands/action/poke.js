const Command = require('../../structures/BaseCommand');

class PokeCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'poke',
            desc: 'poke a user!',
            usage: 'poke [@mention]',
            category: 'Action',
            examples: [
                '{prefix}poke',
                '{prefix}poke @Melmsie#0002'
            ]
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/poke');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: `<:KonataDreaming:710895044504322099> **|** ${msg.author.mention}: Since your didn't want to poke with someone; You're poking me!`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        } else {
                msg.channel.createMessage({ 
                    content: `<:KonataDreaming:710895044504322099> **|** ${msg.author.mention} is poking <@${msg.mentions[0].id}>`,
                    embed: {
                        image: {
                            url: neko.body.url
                        },
                        color: this.bot.utils.color
                }});
        }
    }
}

module.exports = PokeCommand;