const Command = require('../../structures/BaseCommand');

class RedPandaCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'red-panda',
            desc: 'Get a random red-panda.',
            usage: 'red-panda',
            aliases: [
                'redpanda'
            ],
            examples: [
                '{prefix}red-panda'
            ],
            category: 'Animals'
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a red panda..');

        const { body } = await this.bot.snek.get('https://animal.anidiots.guide/red_panda');
        await ctx.delete();
        msg.channel.createMessage({
            content: ':white_check_mark: **|** Here is your red panda!',
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

module.exports = red-pandaCommand;