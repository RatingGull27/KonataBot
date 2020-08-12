const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/nsfw/femdom")

class femdomCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'femdom',
            desc: 'femdom a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}femdom',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a femdom..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}

module.exports = femdomCommand;