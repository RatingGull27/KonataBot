const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/swfn/kiss");

class KissCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'kiss',
            desc: 'kiss a user!',
            usage: 'kiss [@mention]',
            category: 'Action',
            examples: [
                '{prefix}kiss',
                '{prefix}kiss @Melmsie#0002'
            ]
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a kiss..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}

module.exports = KissCommand;