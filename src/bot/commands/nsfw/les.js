const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/nsfw/les");

class lesCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'les',
            desc: 'les a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}les',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a les..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}

module.exports = lesCommand;