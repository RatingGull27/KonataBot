const Command = require('../../structures/BaseCommand');
const DatabaseException = require('../../../errors/DatabaseError');

class SettingsCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'settings',
            desc: 'Don\'t like what Konata has as default? Change it!',
            usage: 'settings [set | reset | list] [setting] [value]',
            aliases: [
                'config',
                'conf'
            ],
            examples: [
                '{prefix}settings set guild.prefix ?',
                '{prefix}settings reset guild.prefix',
                '{prefix}settings list'
            ],
            ownerOnly: true
        });
    }

    async execute(msg, args) {
        if (args.length < 1) return msg.channel.createMessage(`<:KonataCry:582307198957387795> **|** Please provide \`set\` \`reset\` or \`list\`.`);
        this.bot.r.table('guilds').get(msg.channel.guild.id).run((error, settings) => {
            if (error) new DatabaseException(this.bot, error);
            if (!msg.member.permission.has('manageGuild') && !this.bot.config.devs.includes(msg.author.id)) {
                msg.channel.createMessage(`<:KonataCry:582307198957387795> **|** You must have the \`manageGuild\` permission to execute this command!`);
                return;
            }
            if (args[0].toLowerCase() === 'set') {
                if (args.length < 2) return msg.channel.createMessage(`<:KonataCry:582307198957387795> **|** You must provide a setting name to modify it.`);
                if (args.length < 3) return msg.channel.createMessage(`<:KonataCry:582307198957387795> **|** You must provide a value to modify it.`);
                if (args[1].toLowerCase() === 'guild.welcomeMessages.enabled') {
                    let enabled;
                    if (args[2].toLowerCase() === 'true' || args[2].toLowerCase() === 'yes') {
                        enabled = true;
                    }

                    if (args[2].toLowerCase() === 'false' || args[2].toLowerCase() === 'no') {
                        enabled = false;
                    }

                    this.bot.r.table('guilds').get(msg.channel.guild.id).update({
                        greetingMessages: {
                            enabled
                        }
                    }).run();
                    msg.channel.createMessage(`<:Wink:438840967869497357> **|** Greeting Messages has been set to \`${enabled ? 'enabled' : 'disabled'}\``);
                }
            }
        });
    }
}

module.exports = SettingsCommand;