const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/nsfw/solog");

class sologCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'solog',
            desc: 'solog a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}solog',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a solog..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}
module.exports = sologCommand;