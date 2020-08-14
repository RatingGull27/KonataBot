const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/nsfw/hentai");

class hentaiCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'hentai',
            desc: 'hentai a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}hentai',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a hentai..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}

module.exports = hentaiCommand;