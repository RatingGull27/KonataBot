const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/nsfw/spank");

class spankCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'spank',
            desc: 'spank a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}spank',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a spank..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}

module.exports = spankCommand;