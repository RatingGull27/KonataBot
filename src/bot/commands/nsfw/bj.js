const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/nsfw/bj");

class bjCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'bj',
            desc: 'bj a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}bj',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a bj..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}

module.exports = bjCommand;