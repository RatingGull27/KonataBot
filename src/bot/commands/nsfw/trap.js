const Command = require('../../structures/BaseCommand');

class trapCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'trap',
            desc: 'trap a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}trap',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const neko = await this.bot.snek.get('https://nekos.life/api/v2/img/trap');

        if (!msg.mentions[0]) {
            msg.channel.createMessage({ 
            content: `<:KonataDreaming:582307197829251073> **|** ${msg.author.mention}: Since your didn't want to trap with someone; You're trap me!`,
            embed: {
                image: {
                    url: imageUrl
                },
                color: this.bot.utils.color
            }});
        } else {
                msg.channel.createMessage({ 
                    content: `<:KonataDreaming:582307197829251073> **|** ${msg.author.mention} is traping <@${msg.mentions[0].id}>`,
                    embed: {
                        image: {
                            url: imageUrl
                        },
                        color: this.bot.utils.color
                }});
        }
    }
}

module.exports = trapCommand;
