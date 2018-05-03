const Command = require('../../structures/BaseCommand');

class KonataCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'konata',
            desc: 'Shows a picture of me! L-lewdie!',
            usage: 'konata',
            aliases: [
                'me'
            ],
            examples: [
                '{prefix}konata'
            ],
            category: 'Weebs',
            ownerOnly: true
        });
    }

    async execute(msg, args) {
        this.bot.snek.get('http://localhost:81/api/konata').then((res) => {
            msg.channel.createMessage({
                content: '<:Wink:438840967869497357> **|** Here you go, lewdie!',
                embed: {
                    image: {
                        url: res.body.url
                    },
                    color: this.bot.utils.color
                }
            });
        });
    }
}

module.exports = KonataCommand;