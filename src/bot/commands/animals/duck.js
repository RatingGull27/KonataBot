const Command = require('../../structures/BaseCommand');

class DuckCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'duck',
            desc: 'Get a random duck.',
            usage: 'duck',
            aliases: [
                'ducc'
            ],
            examples: [
                '{prefix}duck'
            ],
            category: 'Animals'
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a duck..');

        const { body } = await this.bot.snek.get('https://random-d.uk/api/v1/random');
        await ctx.delete();
        msg.channel.createMessage({
            content: ':white_check_mark: **|** Here is your duck!',
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

module.exports = DuckCommand;