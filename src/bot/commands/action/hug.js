const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/swfn/hug");

class HugCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'hug',
            desc: 'hug a user!',
            usage: 'hug [@mention]',
            category: 'Action',
            examples: [
                '{prefix}hug',
                '{prefix}hug @Melmsie#0002'
            ]
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a hug..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}

module.exports = HugCommand;