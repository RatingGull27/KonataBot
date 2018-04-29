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
        await exec(args.join(" "), (stderr, stdout, err) => {
            let result = stdout || stderr;

            if (err) {
                return m.edit(this.bot.utils.codeblock(null, stderr));
            } else if (stdout.length > 1990 && err.length > 1990) {
                this.bot.snek
                    .post(`https://h.mayo.pw/documents`)
                    .send(stdout || stderr)
                    .then(res => m.edit('<:Wink:438840967869497357> **|** Hastebin: `https://h.mayo.pw/' + res.body.key + '.js'));
            } else {
                return m.edit(this.bot.utils.codeblock(null, stdout));
            }
        });
    }
}

module.exports = ExecCommand;