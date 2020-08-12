const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/nsfw/r34");

class r34Command extends Command {
    constructor(bot) {
        super(bot, {
            name: 'r34',
            desc: 'r34 a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}r34',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a r34..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}

module.exports = r34Command;