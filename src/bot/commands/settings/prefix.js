const Command = require('../../structures/BaseCommand');
const HandleDatabaseError = require('../../structures/HandleDatabaseError');

class PrefixCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'prefix',
            desc: 'Shows the current prefix or sets a new prefix.',
            usage: 'prefix [new_prefix]',
            examples: [ 
                'konata prefix !',
                'k;prefix'
            ],
            guildOnly: true,
            category: 'Settings'
        });
    }

    async execute(ctx, args) {
        this.bot.r.table('settings').get(ctx.channel.guild.id).run((err, entry) => {
            if (!ctx.member.permission.has('manageGuild') && !this.bot.config.devs.includes(ctx.author.id) && args[0]) return ctx.channel.createMessage(':x: **|** You can\'t set a prefix without the `manageGuild` permission.');
            if (!args[0]) return ctx.channel.createMessage(`<:Wink:438840967869497357> **|** Current Prefix for **${ctx.channel.guild.name}** is: \`${entry.prefix || this.bot.config.prefix}\`.`);

            let prefix = args.join(" ");
            if (prefix.length > 15) return ctx.channel.createMessage('<:Wink:438840967869497357> **|** Prefix went over the limit (15 characters)');
            if (entry.prefix === args.join(' ').toLowerCase()) {
                return ctx.channel.createMessage(`:x: **|** That is the current prefix.`);
            }

            this.bot.r.table('settings').update({
                prefix: prefix
            }).run((e, res) => {
                if (e) HandleDatabaseError(this.bot, e, ctx);
                ctx.channel.createMessage(`:white_check_mark: **|** Set the prefix to \`${prefix}\``);
            });
        });
    }
}

module.exports = PrefixCommand;