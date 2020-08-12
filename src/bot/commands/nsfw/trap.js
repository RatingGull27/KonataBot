const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/nsfw/trap");

class trapCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'trap',
            desc: 'trap a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}trap',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a trap..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}

module.exports = trapCommand;