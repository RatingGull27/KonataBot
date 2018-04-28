const c = require('cheerio');
const Command = require('../../structures/BaseCommand');

class FuckMyLifeCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'fml',
            desc: 'Searches a "fuck my life" quote.',
            usage: 'fml',
            aliases: ['fuck-my-life', 'fucc-my-life', 'fucc'],
            examples: ['k;fuck-my-life'],
            category: 'Fun'
        });
    }

    async execute(msg, args) {
        const m = await msg.channel.createMessage(`<:KonataOk:438856307580338176> **|** Grabbing a fuck my life quote..`);

        const { body } = await this.bot.snek.get('http://www.fmylife.com/random');
        const $ = c.load(body);
        const quote = $('p.block.hidden-xs > a').first().text();

        try {
            m.edit(`:mega: **|** ${quote}`);
        } catch(err) {
            m.edit(`<:KonataCry:438856292178591745> **|** An error has occured: \`${err.message}\`. Try again!`);
        }
    }
}

module.exports = FuckMyLifeCommand;