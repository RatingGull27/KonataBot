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

        const prefixes = ['konata!', `${prefixMention}`, 'k;', 'k!', '!k.', 'konata ']; // @mention, konata!, k;, k!, !k., and konata  => Prefixes
        const devPrefixes = [bot.config.prefix, `${prefixMention}`, 'dev!', 'dev '];
        
        for (const thisPrefix of devPrefixes) {
            if (msg.content.startsWith(thisPrefix)) prefix = thisPrefix;
        }

        if (!prefix) return;
        
        const args = msg.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift();
        let cmd = this.bot.commands.find(c => c.options.name.includes(command) || c.options.aliases.includes(command));
    
        if (!command) return;

        if (this.bot.cooldowns.has(msg.author.id)) return msg.channel.createMessage(`You must wait \`${cmd.options.cooldown}\` seconds!`);

        this.bot.cooldowns.add(msg.author.id);

        setInterval(() => {
            this.bot.cooldowns.delete(msg.author.id);
        }, cmd.options.cooldown * 10);

        if (cmd) {
            if (cmd.options.nsfwOnly && !msg.channel.nsfw) {
                return msg.channel.createMessage(`<:KonataDreaming:743078005861253140> **|** Planning to use my nsfw commands? You need to be in a nsfw channel! hehe~`);
            }

            if (cmd.options.guildOnly && msg.channel.dm) {
                return msg.channel.createMessage(`<:KonataDreaming:743078005861253140> **|** Y-you might wanna be in a guild to execute this command.`);
            }

            if (cmd.options.ownerOnly && !msg.author.id) {
               return msg.channel.createMessage(`<:KonataDreaming:743078005861253140> **|** You don't have permission to execute this! >~<`);
            }

            try {
                bot.commandsExecuted++;
                cmd.execute(msg, args);
            } catch(err) {
                msg.channel.createMessage(`<:konatacry:743078005672247338> **|** Woops! An error has occured while executing that command.\nSend \`\`\`${bot.utils.codeblock('js', err.stack)}\`\`\` to my support server: ${bot.config.links.discord}`);
            }
        }
    }
}


module.exports = MessageEvent;