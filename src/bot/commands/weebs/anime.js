const Command = require('../../structures/BaseCommand');

class AnimuCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'anime',
            desc: 'Searches an anime on Kitsu.',
            usage: 'anime [random | anime]',
            aliases: [
                'animu'
            ],
            examples: [
                'k;animu Eromanga Sensei'
            ],
            category: 'Weebs'
        });
    }

    async execute(msg, args) {
        if (!args[0]) return msg.channel.createMessage('<:owoThink:582320118173007883> **|** I can\'t search an anime without one! >////<');

        const { data } = await this.bot.kitsu.fetch('anime', {
            filter: {
                text: args.join('-')
            }
        });
        await this._makeEmbed(msg, data[0]);
    }

    async _makeEmbed(msg, data) {
        const { titles, subtype, startDate, endDate, popularityRank, id, synopsis, episodeCount } = data;

        return msg.channel.createMessage({ embed: {
            title: `Konata Izumi » Anime ${titles.en} | ${titles.en_jp} (ID: ${id})`,
            description: this.bot.utils.shorten(synopsis, 1024),
            fields: [{
                name: '» Start / End Dates',
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
            },
            {
                name: "» Episode Count",
                value: `${episodeCount} episodes.`,
                inline: true
            }],
            color: this.bot.utils.color,
            url: `https://kitsu.io/anime/${id}`
        }});
    }
}

module.exports = AnimuCommand;