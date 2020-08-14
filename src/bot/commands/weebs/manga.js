const Command = require('../../structures/BaseCommand');

class MangaCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'manga',
            desc: 'Searches a manga on Kitsu!',
            usage: 'anime [manga]',
            examples: [
                'k;manga Eromanga Sensei'
            ],
            category: 'Weebs'
        });
    }

    async execute(msg, args) {
        if (!args[0]) return msg.channel.createMessage('<:owothink:743078005689155595> **|** I can\'t search an anime without one! >////<');

        const { data } = await this.bot.kitsu.fetch('manga', {
            filter: {
                text: args.join('-')
            }
        });
        await this._makeEmbed(msg, data[0]);
    }

    async _makeEmbed(msg, data) {
        const { titles, subtype, startDate, endDate, popularityRank, id, synopsis, episodeCount } = data;

        return msg.channel.createMessage({ embed: {
            title: `Konata Izumi » Manga ${titles.en} | ${titles.en_jp} (ID: ${id})`,
            description: this.bot.utils.shorten(synopsis, 1024),
            fields: [{
                name: '» Start / End Date',
                value: `• **Start**: ${startDate}\n• **End**: ${endDate || 'Still in progress.'}`,
                inline: true
            },
            {
                name: "» Popularity Rank",
                value: popularityRank,
                inline: true
            },
            {
                name: "» Show Type",
                value: subtype,
                inline: true
            }],
            color: this.bot.utils.color,
            url: `https://kitsu.io/anime/${id}`
        }});
    }
}

module.exports = MangaCommand;