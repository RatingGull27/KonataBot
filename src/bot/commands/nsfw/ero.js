const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/nsfw/ero");

class eroCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'ero',
            desc: 'ero a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}ero',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a ero..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}

module.exports = eroCommand;