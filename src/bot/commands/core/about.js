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
            description: "<:konataHi:710895044847992853> **Hello! I'm Konata, your weeb helper!**\n\t<:konataowo:710900227887857704> I provide you everything that you want in your server:\n\n__**Features**__\n\t:ribbon: Moderation commands!\n\t:ribbon: Utilitized commands\n\t:ribbon: and much more!\n\t:heart: I was made by DELECTABLE Day Yay#0211, 9881youlove#0037",
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