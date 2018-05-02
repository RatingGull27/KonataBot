const Command = require('../../structures/BaseCommand'),
    DatabaseError = require('../../../errors/DatabaseError');

class ProfileCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'profile',
            desc: 'Views your profile or someone elses!',
            usage: 'profile [@mention]',
            examples: [
                '{prefix}profile @Melmsie#0001'
            ],
            category: 'Economy'
        });
    }

    async execute(msg, args) {
        this.bot.r.table('users').get(msg.author.id).run((err, profile) => {
            if (err) new DatabaseError(this.bot, err, msg);
            if (msg.mentions[0]) {
                msg.channel.createMessage({
                    content: `<:KonataOwO:438519335556874240> **|** Here is ${msg.mentions[0].username}'s profile:`,
                    fields: [{
                        name: "» Misc",
                        value: `• **Waifu**: \`${profile.profiles.waifu || `Set a waifu with \`${profile.prefix || bot.config.prefix}settings user waifu <waifu>\``}\n• **osu!** \`${profile.profiles.osu || 'No osu! name.'}\`)`
                    }],
                    color: this.bot.utils.color
                });
            }
        });
    }
}

module.exports = ProfileCommand;