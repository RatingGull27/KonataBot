const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/nsfw/blowjobs");

class boobsCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'boobs',
            desc: 'boobs a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}boobs',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a boobs..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}

module.exports = boobsCommand;