const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/nsfw/keta");

class ketaCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'keta',
            desc: 'keta a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}keta',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a keta..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}

module.exports = ketaCommand;