const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/nsfw/eron");

class eronCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'eron',
            desc: 'eron a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}eron',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a eron..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}

module.exports = eronCommand;