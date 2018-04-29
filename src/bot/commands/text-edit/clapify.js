const Command = require('../../structures/BaseCommand');

class ClapifyCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'clapify',
            desc: 'Clapify your message.',
            usage: 'clapify [words]',
            aliases: [
                'clap',
                'clap-about'
            ],
            examples: [
                'k;clapify Nobellium Uranium'
            ],
            category: 'Text Edit'
        });
    }

    async execute(msg, args) {
        if (!args[0]) return msg.channel.createMessage(`:clap: **|** :clap: How :clap: can :clap: I :clap: clapify :clap: that :clap: message? :clap:`);

        const txt = args.join(" :clap: ");
        if (txt.length > 100) return msg.channel.createMessage(`:clap: **|** :clap: That's :clap: over :clap: the :clap: limit! :clap:`);
        msg.channel.createMessage(`:clap: **|** :clap: ${txt} :clap:`);
    }
}

module.exports = ClapifyCommand;