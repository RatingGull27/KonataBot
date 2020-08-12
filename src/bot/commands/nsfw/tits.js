const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/nsfw/tits");

class titsCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'tits',
            desc: 'tits a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}tits',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a tits..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}

module.exports = titsCommand;