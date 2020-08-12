const Command = require('../../structures/BaseCommand');

class BirbCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'birb',
            desc: 'Get a random birb.',
            usage: 'birb',
            aliases: [
                'bird'
            ],
            examples: [
                '{prefix}birb'
            ],
            category: 'Animals'
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a birb..');

        const { body } = await this.client.snek.get('https://random.birb.pw/tweet');
        await ctx.delete();
        msg.channel.createMessage({
            content: ':white_check_mark: **|** Here is your birb!',
            embed: {
                title: "Click me if the image failed!",
                url: `https://random.birb.pw/img/${body}`,
                image: {
                    url: `https://random.birb.pw/img/${body}`
                },
                color: this.bot.utils.color
            }
        });
    }
}

module.exports = BirbCommand;