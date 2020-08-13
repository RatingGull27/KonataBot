const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/nsfw/erofeet");

class erofeetsCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'erofeets',
            desc: 'erofeests a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}erofeets',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a erofeets..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}

module.exports = erofeetsCommand;