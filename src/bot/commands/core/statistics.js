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
            fields: [{
                name: "» Misc",
                value: `• **Guilds**: ${this.bot.guilds.size}\n• **Users**: ${this.bot.users.size}\n• **Channels**: ${Object.keys(this.bot.channelGuildMap).length}\n• **Commands/Messages Seen**:\n\t• **Messages**: ${this.bot.messages.toLocaleString()}\n\t• **Commands Executed**: ${this.bot.commandsExecuted.toLocaleString()}`,
                inline: true
            },
            {
                name: "» Versions",
                value: `• Node.js: ${process.version}\n• Eris: v${erisVersion}\n• KonataBot: v${this.bot.version}`,
                inline: true
            },
            ],
            color: this.bot.utils.color
        }});
    }
}

module.exports = StatisticsCommand;