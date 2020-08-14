const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/nsfw/cum");

class cumCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'cum',
            desc: 'cum a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}cum',
            ],
            cooldown: 1
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a cum..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}

module.exports = cumCommand;