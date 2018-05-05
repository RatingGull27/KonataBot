const Command = require('../../structures/BaseCommand');

class TigerCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'tiger',
            desc: 'Get a random tiger.',
            usage: 'tiger',
            examples: [
                '{prefix}tiger'
            ],
            category: 'Animals'
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a tiger..');

        const { body } = await this.bot.snek.get('https://animals.anidiots.guide/tiger');
        await ctx.delete();
        msg.channel.createMessage({
            content: ':white_check_mark: **|** Here is your tiger!',
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

module.exports = TigerCommand;
