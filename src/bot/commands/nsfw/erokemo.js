const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/nsfw/erokemo");

class erokemoCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'erokemo',
            desc: 'erokemo a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}erokemo',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a erokemo..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}

module.exports = erokemoCommand;