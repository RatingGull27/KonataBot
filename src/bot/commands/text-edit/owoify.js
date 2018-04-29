const Command = require('../../structures/BaseCommand');

class OwOify extends Command {
    constructor(bot) {
        super(bot, {
            name: 'owoify',
            desc: 'OwOify your message!',
            usage: 'owoify [text]',
            aliases: [
                'owo',
                'owo-whats-this'
            ],
            examples: [
                'k;owo REI IS A MEMMEEMEMEMEMEMMEMEMEME'
            ],
            category: 'Text Edit'
        });
    }

    async execute(msg, args) {
        if (!args[0]) return msg.channel.createMessage(':x: **|** How can I OwOify that message?');

        const m = await msg.channel.createMessage(':mag: **|** OwOifying...');
        const txt = args.join(" ");
        if (txt.length > 100) return m.edit(':x: **|** Woah, that\'s over the limit!');

        const { body } = await this.bot.snek.get(`https://nekos.life/api/v2/owoify?text=${txt}`);
        if (body.owo === null) return m.edit(':x: **|** Couldn\'t owoify that message!');
        m.edit(':mega: **|** ' + body.owo);
    }
}

module.exports = OwOify;