const Command = require('../../structures/BaseCommand');
const { VERSION: erisVersion } = require('eris');

class StatisticsCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'statistics',
            desc: 'Grabs my realtime statistics.',
            usage: 'statistics',
            aliases: ['info', 'botinfo', 'stats', 'bot'],
            examples: ["k;statistics", 'k;stats']
        });
    }

    async execute(msg, args) {
        return msg.channel.createMessage({ embed: {
            title: "Konata Izumi » Realtime Statistics",
            description: `**Uptime**: ${await this.bot.utils.formatDuration(process.uptime())}`,
            fields: [{
                name: "» Guilds",
                value: this.bot.guilds.size,
                inline: true
            },
            {
                name: "» Users",
                value: this.bot.users.size,
                inline: true
            },
            {
                name: "» Shard Count",
                value: this.bot.shards.size,
                inline: true
            },
            {
                name: "» Versions",
                value: `» Node.js: ${process.version}\n» Eris: v${erisVersion}\n» KonataBot: v${this.bot.version}`,
                inline: false
            },
            {
                name: "» Commands Executed",
                value: this.bot.commandsExecuted,
                inline: true
            },
            {
                name: "» Messages Seen",
                value: this.bot.messages,
                inline: true
            },
            {
                name: "» Channels",
                value: Object.keys(this.bot.channelGuildMap).length,
                inline: true
            }],
            color: this.bot.utils.color
        }});
    }
}

module.exports = StatisticsCommand;