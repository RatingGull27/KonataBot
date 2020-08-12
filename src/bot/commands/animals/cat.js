const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/swfn/cat");

class CatCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'cat',
            desc: 'Get a random cat.',
            usage: 'cat',
            aliases: [
                'kitty'
            ],
            examples: [
                '{prefix}cat'
            ],
            category: 'Animals'
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(':mag: **|** Grabbing a kiss..');

        await ctx.delete();
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}

module.exports = CatCommand;