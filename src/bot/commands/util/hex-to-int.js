const Command = require('../../structures/BaseCommand');

class HexToIntCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'hex-to-int',
            desc: 'Shows the integer version of an specified hex.',
            usage: 'hex-to-int [hex]',
            aliases: [
                'int',
                'show-int'
            ],
            examples: [
                'k;hex-to-int 9321AA'
            ],
            category: 'Utility'
        });
    }

    async execute(msg, args) {
        if (!args[0]) return msg.channel.createMessage('<:owoThink:582320118173007883> **|** Provide a hex color.');
        if (!/^[0-9A-F]{6}$/i.test(args[0].toString())) return msg.channel.createMessage(':x: **|** Invalid hex color! (Tip: Use the hex without the pound!)');

        msg.channel.createMessage(`<:owoThink:582320118173007883> **|** The integer version of \`#${args[0]}\` is: \`${parseInt(`0x${args[0]}`)}\`.`);
    }
}

module.exports = HexToIntCommand;