const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/nsfw/solo");

class soloCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'solo',
            desc: 'solo a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}solo',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a solo..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}

module.exports = soloCommand;