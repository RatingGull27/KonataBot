const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/nsfw/erok");

class erokCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'erok',
            desc: 'erok a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}erok',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a erok..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}

module.exports = erokCommand;