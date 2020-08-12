const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/nsfw/feetg");

class feetgCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'feetg',
            desc: 'feetg a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}feetg',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a feetg..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}

module.exports = feetgCommand;