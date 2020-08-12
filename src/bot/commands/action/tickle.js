const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/swfn/tickle");

class TickleCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'tickle',
            desc: 'tickle a user!',
            usage: 'tickle [@mention]',
            category: 'Action',
            examples: [
                '{prefix}tickle',
                '{prefix}tickle @Melmsie#0002'
            ]
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a tickle..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}

module.exports = TickleCommand;