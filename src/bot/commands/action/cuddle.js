const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/swfn/cuddle");

class CuddleCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'cuddle',
            desc: 'Cuddle a user!',
            usage: 'cuddle [@mention]',
            category: 'Action',
            examples: [
                '{prefix}cuddle',
                '{prefix}cuddle @Melmsie#0002'
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a cuddle..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}

module.exports = CuddleCommand;