const Command = require('../../structures/BaseCommand');

class LizardCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'lizard',
            desc: 'Get a random lizard.',
            usage: 'lizard',
            aliases: [
                'lizzyboi' // OwO
            ],
            examples: [
                '{prefix}lizard'
            ],
            category: 'Animals'
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a lizard..');

        const { body } = await this.bot.snek.get('https://nekos.life/api/v2/img/lizard');
        await ctx.delete();
        msg.channel.createMessage({
            content: ':white_check_mark: **|** Here is your lizard!',
            embed: {
                title: "Click me if the image failed!",
                url: `${body.url}`,
                image: {
                    url: `${body.url}`
                },
                color: this.bot.utils.color
            }
        });
    }
}

module.exports = LizardCommand;