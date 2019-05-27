const Command = require('../../structures/BaseCommand');

class MakeGuildInviteCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'make-guild-invite',
            desc: 'Make Konata make a guild invititation. (If you\'re lazy.)',
            usage: 'make-guild-invite',
            aliases: [
                'guild-invite'
            ],
            examples: [
                'konata make-guild-invite'
            ],
            category: 'Utility'
        });
    }

    async execute(msg, args) {
        const m = await msg.channel.createMessage('<:owoThink:582320118173007883> **|** Creating guild invite...');
        const createInvite = msg.channel.permissionsOf(this.bot.user.id).has('createInstantInvite');
        if (!createInvite) return m.edit(':x: **|** Can\'t create an invitation. (I need the `CREATE_INSTANT_INVITE` permission!)');

        msg.channel.createInvite()
            .then((i) => {
                m.edit(`:white_check_mark: **|** Successfully created an invite!\nhttps://discord.gg/${i.code}`);
            });
    }
}

module.exports = MakeGuildInviteCommand;