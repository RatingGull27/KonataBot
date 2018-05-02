const Command = require('../../structures/BaseCommand');

class DogCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'dog',
            desc: 'Get a random dog.',
            usage: 'dog',
            aliases: [
                'puppers',
                'doggo'
            ],
            examples: [
                '{prefix}dog'
            ],
            category: 'Animals'
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a dog..');

        const { body } = await this.bot.snek.get('https://random.dog/woof.json');
        await ctx.delete();
        msg.channel.createMessage({
            content: ':white_check_mark: **|** Here is your dog!',
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

module.exports = DogCommand;