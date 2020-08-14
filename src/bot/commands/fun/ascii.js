const figlet = require('figlet');
const Command = require('../../structures/BaseCommand');

class AsciiCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'ascii',
            desc: 'Makes some ascii art with some words!',
            usage: 'ascii [...words]',
            aliases: ['figlet'],
            examples: ['k;figlet Konata', 'konata ascii Kagami'],
            category: 'Fun'
        });
    }

    async execute(msg, args) {
        if (!args[0]) return msg.channel.createMessage(`<:konatacry:743078005672247338> **|** I can't do ascii art without words!`);
        
        await figlet(args.join(" "), (err, data) => {
            if (err) return msg.channel.createMessage(`<:konatacry:743078005672247338> **|** An error has occured! \`${err.message}\`. Try again later.`);
            msg.channel.createMessage(this.bot.utils.codeblock(null, data));
        });
    }
}

module.exports = AsciiCommand;