const Command = require('../../structures/BaseCommand');

class PandaCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'panda',
            desc: 'Get a random panda.',
            usage: 'panda',
            examples: [
                '{prefix}panda'
            ],
            category: 'Animals'
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a panda..');

        const { body } = await this.bot.snek.get('https://animal.anidiots.guide/panda');
        await ctx.delete();
        msg.channel.createMessage({
            content: ':white_check_mark: **|** Here is your panda!',
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

module.exports = PandaCommand;