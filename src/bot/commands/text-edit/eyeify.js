const Command = require('../../structures/BaseCommand');

class EyeifyCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'eyeify',
            desc: 'Eyeify your message.',
            usage: 'eyeify [words]',
            aliases: [
                'eyes',
                'eyes-to'
            ],
            examples: [
                'k;eyeify Nobellium Uranium'
            ],
            category: 'Text Edit'
        });
    }

    async execute(msg, args) {
        if (!args[0]) return msg.channel.createMessage(`:eyes: **|** :eyes: How :eyes: can :eyes: I :eyes: eyeify :eyes: that :eyes: message? :eyes:`);

        const txt = args.join(" :eyes: ");

        if (txt.length > 100) return msg.channel.createMessage(`:eyes: **|** :eyes: That's :eyes: over :eyes: the :eyes: limit! :eyes:`);
        msg.channel.createMessage(`:eyes: **|** :eyes: ${txt} :eyes:`);
    }
}

module.exports = EyeifyCommand;