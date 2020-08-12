const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/swfn/pat")

class PatCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'pat',
            desc: 'Pat someone!',
            usage: 'pat [@mention]',
            examples: [
                'k;pat @computerfreaker#4054'
            ],
            category: 'Action'
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a pat..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}

module.exports = PatCommand;