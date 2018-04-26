const Event = require('../structures/BaseEvent');

class GuildJoinedEvent extends Event {
    constructor(bot) {
        super(bot, {
            name: 'guildCreate'
        });
    }

    async execute(guild) {
        await this.bot.db.createGuild(guild.id);
        this.bot.log.info(`Konata Izumi joined ${guild.name} (${guild.id})!`);
        this.bot.webhook.createMessage({
            title: "Konata Izumi ;; Joined Guild",
            description: "Ok, I joined a guild! Is it that suprising?",
            fields: [{
                name: "Guild Name",
                value: guild.name,
                inline: true
            },
            {
                name: "Guild ID",
                value: guild.id,
                inline: false
            },
            {
                name: "Guild Member Count",
                value: `${guild.members.filter(x => !x.isBot.length)} users / ${guild.members.filter(x => x.isBot.length)} bots`
            }],
            color: this.bot.utils.color
        });
    }
}

module.exports = GuildJoinedEvent;