const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/nsfw/gasm");

class gasmCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'gasm',
            desc: 'gasm a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}gasm',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a gasm..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}

module.exports = gasmCommand;