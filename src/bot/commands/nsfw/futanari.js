const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/nsfw/futanari");

class futanariCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'futanari',
            desc: 'futanari a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}futanari',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a futanari..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}


module.exports = futanariCommand;