const Command = require('../../structures/BaseCommand');

class ChooseCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'choose',
            desc: 'Chooses something! (Maybe your waifu!)',
            usage: 'choose [choice1 | choice2]',
            aliases: [
                'waifu-chooser'
            ],
            examples: [
                'konata choose Rem | Emila',
                'k!choose Monika | Sayori | Natsuki | Yuri'
            ],
            category: 'Utility'
        });
    }

    async execute(msg, args) {
        if (!args[0]) return msg.channel.createMessage('<:OwOThink:439675032910954496> **|** You might wanna choose 2 arguments before doing that!');
        if (!args.join(" ").includes(" | ")) return msg.channel.createMessage('<:OwOThink:439675032910954496> **|** Usage: `' + this.options.usage +'`.');

        const text = args.join(" ").split(" | ").filter(x => x && x != " ");
        msg.channel.createMessage(`<:OwOThink:439675032910954496> **|** I choose \`${text[Math.floor(Math.random() * (text.length))].trim()}\`!`);
    }
}

module.exports = ChooseCommand;