const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/nsfw/eroyuri");

class eroyuriCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'eroyuri',
            desc: 'eroyuri a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}eroyuri',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a eroyuri..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}

module.exports = eroyuriCommand;