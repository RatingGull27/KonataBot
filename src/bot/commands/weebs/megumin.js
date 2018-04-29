const Command = require('../../structures/BaseCommand');

class MeguminCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'megumin',
            desc: 'Gets a random megumin image and chant.',
            usage: 'megumin',
            aliases: [
                'megu'
            ],
            examples: [
                'konata megumin'
            ],
            category: 'Weebs'
        });
    }

    async execute(msg, args) {
        const m = await msg.channel.createMessage('<:OwOThink:439675032910954496> **|** Fetching quote and image.');

        const { body } = await this.bot.snek.get('https://megumin.torque.ink/api/explosion')
            .set('User-Agent', 'Konata Izumi/' + require('../../../../package.json').version + '/Production');

        await m.delete();
        msg.channel.createMessage({ embed: {
            title: "Konata Izumi » MEGUMIN!",
            description: `:mega: Megumin always says: **${body.chant}**`,
            image: {
                url: body.img
            },
            color: this.bot.utils.color
        }});
    }
}

module.exports = MeguminCommand;