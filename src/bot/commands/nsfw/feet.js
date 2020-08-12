const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/nsfw/feet");

class feetCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'feet',
            desc: 'feet a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}feet',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a feet..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}

module.exports = feetCommand;