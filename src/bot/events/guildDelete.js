const Event = require('../structures/BaseEvent');

class GuildLeftEvent extends Event {
    constructor(bot) {
        super(bot, {
            name: 'guildDelete'
        });
    }

    async execute(guild) {
        await this.bot.db.deleteGuild(guild.id);
        this.bot.log.info(`Konata Izumi left ${guild.name} (${guild.id})!`);
        this.bot.webhook.createMessage({
            title: "Konata Izumi ;; Left Guild",
            description: "Ok, I lefted a guild, sorry!",
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

module.exports = GuildLeftEvent;