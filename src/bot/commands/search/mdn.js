const Command = require('../../structures/BaseCommand');

class MDNCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'mdn',
            desc: 'Searches the "Mozilla Developer Network" for any JavaScript stuff!',
            usage: 'mdn [search]',
            aliases: [
                'mozilla-developer-network',
                'mozilla'
            ],
            examples: [
                'konata mdn Object',
                'konata mozilla TypeError'
            ],
            category: 'Search'
        });
    }

    async execute(msg, args) {
        if (!args[0]) return msg.channel.createMessage(`<:KonataCry:438856292178591745> **|** I can't search the Mozilla Developer Network without any searches! Use the \`${this.bot.config.prefix}help mdn\` command!`);

        const m = await msg.channel.createMessage(`<:KonataOk:438856307580338176> **|** Searching the Mozilla Developer Network...`);
        const { body } = await this.bot.snek
            .get('https://developer.mozilla.org/en-US/search.json')
            .query({
                q: args.join(" ").replace(/#/, '.prototype.'),
                locale: 'en-US',
                highlight: false
            });

        if (!body.documents.length) return m.edit(`<:KonataCry:438856292178591745> **|** No results found.`);
        const data = body.documents[0];
        await m.delete();
        msg.channel.createMessage({ embed: {
            title: "Konata Izumi » MDN Search",
            description: `__**${data.title}**__\n[\`URL\`](${data.url})\n\n${data.excerpt}`,
            color: this.bot.utils.color
        }});
    }
}

module.exports = MDNCommand;