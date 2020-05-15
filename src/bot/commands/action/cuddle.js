const Command = require('../../structures/BaseCommand');

class CuddleCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'cuddle',
            desc: 'Cuddle a user!',
            usage: 'cuddle [@mention]',
            category: 'Action',
            examples: [
                '{prefix}cuddle',
                '{prefix}cuddle @Melmsie#0002'
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/cuddle');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: `<:KonataDreaming:710895044504322099> **|** ${msg.author.mention}: Since your didn't want to cuddle with someone; You're cuddling with me!`,
            embed: {
                image: {
                    url: neko.body.url
                },
                color: this.bot.utils.color
            }});
        } else {
                msg.channel.createMessage({ 
                    content: `<:KonataDreaming:710895044504322099> **|** ${msg.author.mention} is cuddling <@${msg.mentions[0].id}>`,
                    embed: {
                        image: {
                            url: neko.body.url
                        },
                        color: this.bot.utils.color
                }});
        }
    }
}

module.exports = CuddleCommand;