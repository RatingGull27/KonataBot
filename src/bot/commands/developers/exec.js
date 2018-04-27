const Command = require('../../structures/BaseCommand');
const { exec } = require('child_process');

class ExecCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'exec',
            desc: 'Evaluates bash or shell code.',
            usage: 'exec [...code]',
            aliases: ['bash', 'sh'],
            examples: ['k;bash npm i animu.js'],
            category: 'Developers',
            ownerOnly: true
        });
    }

    async execute(msg, args) {
        if (!args[0]) return msg.channel.createMessage(`<:KonataYawn:438856268338298881> **|** Invalid usage! Use \`${this.bot.config.prefix}help exec\`!`);

        const m = await msg.channel.createMessage(`❯_ \`${args.join(' ')}\``);
        await exec(args.join(" "), (err, stderr, stdout) => {
            if (err) m.edit(`<:KonataYawn:438856268338298881> **|** Execution errored: ${this.bot.utils.codeblock(null, stderr)}`);

            m.edit(`<:KonataOk:438856307580338176> **|** Execution went successful: ${this.bot.utils.codeblock(null, stdout)}`);
        });
    }
}

module.exports = ExecCommand;