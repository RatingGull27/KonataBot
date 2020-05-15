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
            return msg.channel.createMessage(`<:konatacry:710895046492160080> **|** Invalid argument, visit \`${this.bot.config.prefix}help ping\`!`);
        }

        if (msg.content.includes(' shard')) {
            const message = await msg.channel.createMessage(`<:konataok:710895044902649996> **|** Getting shard ping...`);
            
            if (this.bot.guildShardMap) {
                let s = 0;

                if (msg.channel.guild) {
                    s = this.bot.guildShardMap[msg.channel.guild.id];
                }

                message.edit(`:ping_pong: **|** Here is the shard ping: \`\`\`prolog\n${this.bot.shards.map(shard => `${s === shard.id ? '>' : ' '}Shard ${shard.id} | ${shard.latency}ms`).join('\n')}\`\`\``);
            } else {
                return message.edit(`<:konatacry:710895046492160080> **|** There isn't a shard map? Try again in a guild?`);
            }
        } else if (msg.content.includes(' message')) {
            const ctx = await msg.channel.createMessage(`<:konataok:710895044902649996> **|** Getting message ping...`);
            const start = Date.now();

            await ctx.delete();
            msg.channel.createMessage(`:ping_pong: **|** Pong! I responded in \`${Date.now() - start}ms\`!`);
        }
    }
}

module.exports = PingCommand;