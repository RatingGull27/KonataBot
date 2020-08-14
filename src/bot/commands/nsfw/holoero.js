const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/nsfw/holoero");

class holoeroCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'holoero',
            desc: 'holoero a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}holoero',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a holoero..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}

module.exports = holoeroCommand;