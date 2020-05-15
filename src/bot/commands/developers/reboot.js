const Command = require('../../structures/BaseCommand');

class RebootCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'reboot',
            desc: 'Reboots Konata.',
            usage: 'reboot',
            examples: ['konata reboot'],
            ownerOnly: true,
            category: 'Developers'
        });
    }

    async execute(msg, args) {
        msg.channel.createMessage('<:konatacry:710895046492160080> **|** I am being rebooted... :<');
        await this.bot.reboot();
        msg.channel.createMessage('<:konataHi:710895044847992853> **|** Yayy~ I\'m back. owo');
    }
}

module.exports = RebootCommand;