const Command = require('../../structures/BaseCommand');

class CatCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'cat',
            desc: 'Get a random cat.',
            usage: 'cat',
            aliases: [
                'kitty'
            ],
            examples: [
                '{prefix}cat'
            ],
            category: 'Animals'
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a cat..');

        const { body } = await this.bot.snek.get('https://nekos.life/api/v2/img/meow');
        await ctx.delete();
        msg.channel.createMessage({
            content: ':white_check_mark: **|** Here is your cat!',
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

module.exports = CatCommand;