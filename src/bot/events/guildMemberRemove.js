const Event = require('../structures/BaseEvent');

class GuildMemberRemove extends Event {
    constructor(bot) {
        super(bot, {
            name: 'guildMemberRemove'
        });
    }

    async execute(guild, member) {
        const guildData = this.bot.r.table('guilds').get(guild.id).run();

        if (guildData.farewellMessages.enabled) {
            console.log('cool.');
        }
    }
}

module.exports = GuildMemberRemove;