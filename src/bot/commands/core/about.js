const Command = require('../../structures/BaseCommand');

class AboutCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'about',
            desc: 'About me, Konata Izumi.',
            usage: 'about',
            aliases: ['izumi-chan'],
            examples: ['k;izumi-chan', '!k.konata']
        });
    }

    async execute(msg, args) {
        return msg.channel.createMessage({ embed: {
            title: "__**About Konata Izumi**__",
            description: "<:KonataHi:438518453083701249> **Hello! I'm Konata, your weeb helper!**\n\t<:KonataOwO:438519335556874240> I provide you everything that you want in your server:\n\n__**Features**__\n\t:ribbon: Moderation commands!\n\t:ribbon: Utilitized commands\n\t:ribbon: and much more!\n\t:heart: I was made by <@280158289667555328>, <@387043512232968193>, and <@229552088525438977>",
            fields: [{
                name: "Guilds",
                value: this.bot.guilds.size,
                inline: true
            },
            {
                name: "Users",
                value: this.bot.users.size,
                inline: true
            },
            {
                name: "Shard Count",
                value: this.bot.shards.size
            }],
            footer: {
                text: "void#0038 is a meme | Konata Izumi » Your weeb helper!"
            },
            color: this.bot.utils.color
        }});
    }
}

module.exports = AboutCommand;