const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/nsfw/erofeet");

class erofeetCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'erofeet',
            desc: 'erofeet a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}erofeet',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a erofeet..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}

module.exports = erofeetCommand;