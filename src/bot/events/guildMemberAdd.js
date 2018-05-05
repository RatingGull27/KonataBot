const Event = require('../structures/BaseEvent');

class GuildMemberAdd extends Event {
    constructor(bot) {
        super(bot, {
            name: 'guildMemberAdd'
        });
    }

    async execute(guild, member) {
        const guildData = this.bot.r.table('guilds').get(guild.id).run();

        if (guildData.greetingMessages.enabled) {
            console.log('cool.');
        }
    }
}

module.exports = GuildMemberAdd;