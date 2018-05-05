const Command = require('../../structures/BaseCommand');

class PenguinCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'penguin',
            desc: 'Get a random penguin.',
            usage: 'penguin',
            aliases: [
                'pengu'
            ],
            examples: [
                '{prefix}penguin'
            ],
            category: 'Animals'
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a penguin..');

        const { body } = await this.bot.snek.get('https://animals.anidiots.guide/penguin');
        await ctx.delete();
        msg.channel.createMessage({
            content: ':white_check_mark: **|** Here is your penguin!',
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

module.exports = PenguinCommand;
