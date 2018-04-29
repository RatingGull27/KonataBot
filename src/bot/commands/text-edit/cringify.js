const emotes = require('../../../assets/emojis.json');
const Command = require('../../structures/BaseCommand');

class CringifyCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'cringify',
            desc: 'Found something cringy? Crinify it!',
            usage: 'cringify [text]',
            examples: [
                'k;cringify no u'
            ],
            category: 'Text Edit'
        });
    }

    async execute(msg, args) {
        if (!args[0]) return msg.channel.createMessage(`:weary::eggplant: **|** There isn't anything to cringify!`);
        const m = await msg.channel.createMessage(`:weary: **|** Cringifying...`);

        const text = args.join(emotes[Math.floor(Math.random() * emotes.length)]);
        m.edit(`:white_check_mark: **|** ${text}`);
    }
}

module.exports = CringifyCommand;