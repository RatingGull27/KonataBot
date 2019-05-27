const Command = require('../../structures/BaseCommand');

class ColorCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'color',
            desc: 'Shows the color via hex.',
            usage: 'color [hex]',
            aliases: [
                'hex-color',
                'hex'
            ],
            examples: [
                'k;color 9321AA'
            ],
            category: 'Utility'
        });
    }

    async execute(msg, args) {
        if (!args[0]) return msg.channel.createMessage('<:owoThink:582320118173007883> **|** Provide a hex color.');
        if (!/^[0-9A-F]{6}$/i.test(args[0].toString())) return msg.channel.createMessage(':x: **|** Invalid hex color! (Tip: Use the hex without the pound!)');

        let hex = args[0].toString();
        msg.channel.createMessage({ embed: {
            title: "Konata Izumi » Hex Color",
            description: `Hex: #${hex}`,
            image: {
                url: `http://colorhexa.com/${hex}.png`
            },
            color: parseInt(`0x${hex}`)
        }});
    }
}

module.exports = ColorCommand;