const Command = require('../../structures/BaseCommand');

class RedditCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'reddit',
            desc: 'Searches a subreddit',
            usage: 'reddit [subreddit]',
            examples: [
                'k;reddit osugame'
            ],
            category: 'Search'
        });
    }

    async execute(msg, args) {
        if (!args[0]) return msg.channel.createMessage(`<:konatacry:710895046492160080> **|** I can't search a subreddit without one!`);
        const ctx = await msg.channel.createMessage(`<:konataok:710895044902649996> **|** Searching for subreddit \`${args[0]}\`!`);

        const { body } = await this.bot.snek.get(`https://reddit.com/r/${args[0]}/about.json`);
        if (!('display_name' in body.data)) return msg.channel.createMessage('<:konatacry:710895046492160080> **|** Unavaliable subreddit.');
        await ctx.delete();
        msg.channel.createMessage({ embed: {
            title: `${body.data.title}`,
            description: `Here is some information about subreddit \`${args[0]}\``,
            url: `https://reddit.com/r/${args[0]}`,
            thumbnail: {
                url: body.data.icon_img
            },
            color: this.bot.utils.color,
            image: {
                url: body.data.banner_img
            },
            fields: [{
                name: "» Subreddit Information",
                value: `• **Subreddit Type**: ${body.data.subreddit_type.toString()}\n• **Description**: ${body.data.public_description}\n• **Active Users**: ${body.data.active_user_count}`
            }]
        }});
    }
}

module.exports = RedditCommand;