const Command = require('../../structures/BaseCommand');

class AvatarCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'avatar',
            desc: 'Generate a random avatar.',
            usage: "avatar",
            aliases: [
                'weeb-avatar'
            ],
            examples: [
                'k;avatar'
            ],
            category: 'Utility'
        });
    }

    async execute(msg, args) {
        const m = await msg.channel.createMessage('<:owoThink:582320118173007883> **|** Grabbing random avatar..');

        const { body } = await this.bot.snek.get('https://nekos.life/api/v2/img/avatar');
        await m.delete();
        msg.channel.createMessage({ embed: {
            title: "Konata Izumi » Avatar Generator",
            description: `${msg.author.mention}: Here is your randomly generated avatar:`,
            image: {
                url: `${body.url}`
            },
            color: this.bot.utils.color
        }});
    }
}

module.exports = AvatarCommand;