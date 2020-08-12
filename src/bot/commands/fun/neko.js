const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/swfn/neko");

class NekoCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'neko',
            desc: 'Get a random neko.',
            usage: 'neko',
            aliases: ['catgirl'],
            examples: ['k;catgirl'],
            category: 'Fun'
        });
    }

    async execute(msg, arg) {
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}

module.exports = NekoCommand;