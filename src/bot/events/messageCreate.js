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

        const guildConfig = await this.bot.r.table('guilds').get(msg.channel.guild.id).run();
        const userConfig = await this.bot.r.table('users').get(msg.author.id).run();
        
        if (!guildConfig) await this.bot.r.table('guilds').insert({
            id: msg.channel.guild.id,
            locale: 'en_US',
            prefix: bot.config.prefix,
            disabledCommands: [],
            farewellMessages: {
                message: null,
                channel: null
            },
            greetingMessage: {
                message: null,
                channel: null
            },
            cases: [],
            modLog: {
                channel: null
            }
        }).run();

        if (!userConfig) await this.bot.r.table('users').insert({
            id: msg.author.id,
            economy: {
                coins: 0,
                streak: {
                    time: 0,
                    streak: 0
                }
            },
            profiles: {
                notes: {
                    userID: null,
                    note: null,
                    username: null
                },
                married: {
                    user: null,
                    userID: null
                }
            }
        }).run();
        let gPrefix = guildConfig.prefix || bot.config.prefix;

        let prefix = false;
        const mentionPrefix = new RegExp(`^<@!?${this.bot.user.id}> `);
        const prefixMention = mentionPrefix.exec(msg.content);
        const prefixes = [gPrefix, `${prefixMention}`, 'k!', '!k.', 'konata '];
        const devPrefixes = [gPrefix, `${prefixMention}`, 'dev '];
        
        for (const thisPrefix of devPrefixes) {
            if (msg.content.startsWith(thisPrefix)) prefix = thisPrefix;
        }

        if (!prefix) return;
        
        const args = msg.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift();
        let cmd = this.bot.commands.find(c => c.options.name.includes(command) || c.options.aliases.includes(command));
    
        if (!command || guildConfig.disabledCommands.includes(cmd)) return;

        if (cmd) {
            if (cmd.options.nsfw && !msg.channel.nsfw) {
                return msg.channel.createMessage(`<:KonataDreaming:438856787513573377> **|** Planning to use my nsfw commands? You need to be in a nsfw channel! hehe~`);
            }

            if (cmd.options.guildOnly && msg.channel.dm) {
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
        }
    }
}

module.exports = MessageEvent;