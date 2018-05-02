const Command = require('../../structures/BaseCommand');

class LionCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'lion',
            desc: 'Get a random lion.',
            usage: 'lion',
            examples: [
                '{prefix}lion'
            ],
            category: 'Animals'
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a lion..');

        const { body } = await this.bot.snek.get('https://animal.anidiots.guide/lion');
        await ctx.delete();
        msg.channel.createMessage({
            content: ':white_check_mark: **|** Here is your lion!',
            embed: {
                title: "Click me if the image failed!",
                url: `${body.link}`,
                image: {
                    url: `${body.link}`
                },
                color: this.bot.utils.color
            }
        });
    }
}

module.exports = LionCommand;