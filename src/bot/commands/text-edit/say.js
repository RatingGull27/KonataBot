const Command = require('../../structures/BaseCommand');

class SayCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'say',
            desc: 'Want Konata to say something? Make her say it!',
            usage: 'say [...args]',
            aliases: [
                'say-this'
            ],
            examples: [
                'k;say no u'
            ],
            category: 'Text Edit'
        });
    }

    async execute(msg, args) {
        if (!args[0]) return msg.channel.createMessage(`:eyes: **|** I can't say nothing if there isn't anything to say!`);

        msg.channel.createMessage(`:mega: **|** ${args.join(" ")}`);
    }
}

module.exports = SayCommand;