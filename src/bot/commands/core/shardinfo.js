const Command = require('../../structures/BaseCommand');

class ShardInfoCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'shardinfo',
            desc: 'Gets some depth information about my shards!',
            usage: 'shardinfo',
            aliases: ['shard', 'shards'],
            examples: ['k;shards', 'konata shardinfo']
        });
    }

    async execute(msg, args) {
        const ctx = await msg.channel.createMessage(`<:konataok:710895044902649996> **|** Grabbing shard information...`);

        let shards = '';
        this.bot.shards.map(_ => {
            if (msg.channel.guild.id === _) shards += `Shard ${_.id} | Current Shard |`;
            else shards += `Shard ${_.id} | Latency: ${_.latency}ms | Status: ${_.status.toString()}`;
        }).join('\n');
        const _ = msg.channel.guild.shard;
        await ctx.edit(`\`\`\`prolog\n-- CURRENT -- \nShard ${_.id} | Latency: ${_.latency}ms | Status: ${_.status.toString()}\n -- OTHER SHARDS -- \n${shards}\`\`\``);
    }
}

module.exports = ShardInfoCommand;