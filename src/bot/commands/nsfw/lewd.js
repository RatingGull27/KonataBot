const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/nsfw/lewd");

class lewdCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'lewd',
            desc: 'lewd a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}lewd',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a lewd..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}
module.exports = lewdCommand;