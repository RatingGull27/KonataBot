const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/nsfw/hololewd");

class hololewdCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'hololewd',
            desc: 'hololewd a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}hololewd',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a hololewd..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}

module.exports = hololewdCommand;