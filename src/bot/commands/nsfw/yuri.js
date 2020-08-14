const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/nsfw/yuri");

class yuriCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'yuri',
            desc: 'yuri a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}yuri',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a yuri..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}

module.exports = yuriCommand;