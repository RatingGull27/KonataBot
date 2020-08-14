const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/nsfw/anal");

class analCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'anal',
            desc: 'anal a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}anal',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a anal..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}

module.exports = analCommand;