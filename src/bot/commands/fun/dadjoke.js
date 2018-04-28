const Command = require('../../structures/BaseCommand');

class DadJokeCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'dadjoke',
            desc: 'Get a random dad joke!',
            usage: 'dadjoke',
            aliases: ['jokes-for-dads'],
            examples: ['konata dadjoke'],
            category: 'Fun'
        });
    }

    async execute(msg, args) {
        this.bot.dadjoke.getDadJoke().then((b) => {
            msg.channel.createMessage({ embed: {
                title: "Konata Izumi » Dad Joke",
                description: `:mega: \`${b.joke}\``,
                color: this.bot.utils.color
            }});
        });
    }
}

module.exports = DadJokeCommand;