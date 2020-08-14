const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/swfn/poke");

class PokeCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'poke',
            desc: 'poke a user!',
            usage: 'poke [@mention]',
            category: 'Action',
            examples: [
                '{prefix}poke',
                '{prefix}poke @Melmsie#0002'
            ]
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a poke..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}

module.exports = PokeCommand;