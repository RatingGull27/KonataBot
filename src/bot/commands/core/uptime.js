const Command = require('../../structures/BaseCommand');

class UptimeCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'uptime',
            desc: 'Shows how long I was up for!',
            usage: 'uptime',
            examples: ['konata uptime']
        });
    }

    async execute(msg, args) {
        return msg.channel.createMessage(`<:KonataOk:438856307580338176> **|** I have been up for ${await this.bot.utils.formatDuration(process.uptime())}!`);
    }
}

module.exports = UptimeCommand;