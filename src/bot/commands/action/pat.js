const Command = require('../../structures/BaseCommand');

class PatCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'pat',
            desc: 'Pat someone!',
            usage: 'pat [@mention]',
            examples: [
                'k;pat @computerfreaker#4054'
            ],
            category: 'Action'
        });
    }

    async execute(msg, args) {
        if (!msg.mentions[0]) return msg.channel.createMessage('<:OwOThink:439675032910954496> **|** I can\'t pat anyone without a mention!');

        const { body } = await this.bot.snek.get('https://nekos.life/api/v2/img/pat');
        msg.channel.createMessage({ embed: {
            title: "Konata Izumi » Pat Pat",
            description: `${msg.author.username} *pats* ${msg.mentions[0].username}!`,
            image: {
                url: body.url
            },
            color: this.bot.utils.color
        }});
    }
}

module.exports = PatCommand;