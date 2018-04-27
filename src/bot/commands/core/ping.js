const Command = require('../../structures/BaseCommand');

class PingCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'ping',
            desc: 'Gets my raw latencies. (Message and Shard)',
            usage: 'ping [message | shard]',
            aliases: ['pong', 'ping-pong'],
            examples: ['k;ping message', 'konata!ping-pong shard']
        });
    }

    async execute(msg, args) {
        if (!args[0]) {
            return msg.channel.createMessage(`<:KonataCry:438856292178591745> **|** Invalid argument, visit \`${this.bot.config.prefix}help ping\`!`);
        }

        if (msg.content.includes(' shard')) {
            const message = await msg.channel.createMessage(`<:KonataOk:438856307580338176> **|** Getting shard ping...`);
            
            if (this.bot.guildShardMap) {
                let s = 0;

                if (msg.channel.guild) {
                    s = this.bot.guildShardMap[msg.channel.guild.id];
                }

                message.edit(`:ping_pong: **|** Here is the shard ping: \`\`\`prolog\n${this.bot.shards.map(shard => `${s === shard.id ? '>' : ' '}Shard ${shard.id} | ${shard.latency}ms`).join('\n')}\`\`\``);
            } else {
                return message.edit(`<:KonataCry:438856292178591745> **|** There isn't a shard map? Try again in a guild?`);
            }
        } else if (msg.content.includes(' message')) {
            const ctx = await msg.channel.createMessage(`<:KonataOk:438856307580338176> **|** Getting message ping...`);
            const start = Date.now();

            await ctx.delete();
            msg.channel.createMessage(`:ping_pong: **|** Pong! I responded in \`${Date.now() - start}ms\`!`);
        }
    }
}

module.exports = PingCommand;