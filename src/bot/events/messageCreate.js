const BaseEvent = require('../structures/BaseEvent');

class MessageEvent extends BaseEvent {
    constructor(bot) {
        super(bot, {
            name: 'messageCreate'
        });
    }

    async execute(msg) {
        const { bot } = this;

        bot.messages++;

        if (msg.author.bot || !bot.ready) return;

        let prefix = false;

        const mentionPrefix = new RegExp(`^<@!?${this.bot.user.id}> `);
        const prefixMention = mentionPrefix.exec(msg.content);

        const prefixes = [bot.config.prefix, `${prefixMention}`, 'k;', 'k!', '!k.', 'konata ']; // @mention, konata!, k;, k!, !k., and konata  => Prefixes

        for (const thisPrefix of prefixes) {
            if (msg.content.startsWith(thisPrefix)) prefix = thisPrefix;
        }

        if (!prefix) return;

        
        const args = msg.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift();
        let cmd = this.bot.commands.find(c => c.options.name.includes(command) || c.options.aliases.includes(command));
    
        if (cmd) {
            if (cmd.options.nsfw && !msg.channel.nsfw) {
                return msg.channel.createMessage(`<:KonataDreaming:438856787513573377> **|** Planning to use my nsfw commands? You need to be in a nsfw channel! hehe~`);
            }

            if (cmd.options.guildOnly && !msg.channel.dm) {
                return msg.channel.createMessage(`<:KonataDreaming:438856787513573377> **|** Y-you might wanna be in a guild to execute this command.`);
            }

            if (cmd.options.ownerOnly && !bot.config.devs.includes(msg.author.id)) {
                return msg.channel.createMessage(`<:KonataDreaming:438856787513573377> **|** You don't have permission to execute this! >~<`);
            }

            try {
                bot.commandsExecuted++;
                cmd.execute(msg, args);
            } catch(err) {
                msg.channel.createMessage(`<:KonataCry:438856292178591745> **|** Woops! An error has occured while executing that command.\nSend \`${err.name}: ${err.message}\` to my support server: ${bot.config.links.discord}`);
            }
        } else return;
    }
}

module.exports = MessageEvent;