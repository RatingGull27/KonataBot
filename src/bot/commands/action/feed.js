const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/swfn/feed");

class FeedCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'feed',
            desc: 'feed a user!',
            usage: 'feed [@mention]',
            category: 'Action',
            examples: [
                '{prefix}feed',
                '{prefix}feed @Melmsie#0002'
            ]
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a feed..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}

module.exports = FeedCommand;