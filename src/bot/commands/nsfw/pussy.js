const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/nsfw/pussy");

class pussyCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'pussy',
            desc: 'pussy a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}pussy',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a pussy..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}

module.exports = pussyCommand;