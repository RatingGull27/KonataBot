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
        msg.channel.createMessage('<:KonataCry:582307198957387795> **|** I am being rebooted... :<');
        await this.bot.reboot();
        msg.channel.createMessage('<:KonataHi:582320118592176138> **|** Yayy~ I\'m back. owo');
    }
}

module.exports = RebootCommand;