const Command = require('../../structures/BaseCommand');

class EvalCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'eval',
            desc: 'Executes JavaScript code.',
            usage: 'eval [...code]',
            aliases: ['js'],
            examples: ['konata eval function nou() { return; }'],
            ownerOnly: true,
            category: 'Developers'
        });
    }

    async execute(msg, args) {
        if (!args[0]) {
            return msg.channel.createMessage(`<:KonataYawn:438856268338298881> **|** Invalid usage! Use \`${this.bot.config.prefix}help eval\`!`);
        } else {
            try {
                let res = await eval(args.join(" "));

                if (typeof res !== 'string') {
                    return require('util').inspect({
                        res,
                        depth: 0
                    });
                }

                res = res.replace(new RegExp(this.bot.token.slice(4), 'gi'), '*');
                return msg.channel.createMessage(`<:KonataDreaming:438856787513573377> **|** Evaluated successfully:\n${this.bot.utils.codeblock('js', res)}`);
            } catch(err) {
                return msg.channel.createMessage(`<:KonataYawn:438856268338298881> **|** Error!\n${this.bot.utils.codeblock('js', err)}`);
            }
        }
    }
}

module.exports = EvalCommand;