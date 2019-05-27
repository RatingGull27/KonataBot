const Command = require('../../structures/BaseCommand');

class AnimuPictureCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'animu-picture',
            desc: 'Grabs an anime picture',
            usage: 'animu-picture',
            examples: [
                'animu-picture'
            ],
            category: 'Weebs'
        });
    }

    async execute(msg, args) {
        const m = await msg.channel.createMessage('<:owoThink:582320118173007883> **|** Grabbing that anime picture!');

        const { body } = await this.bot.snek.get('https://computerfreaker.cf/api/anime/read.php')
            .set('User-Agent', 'Konata Izumi/' + require('../../../../package.json').version + '/Production');

        await m.delete();
        msg.channel.createMessage({ embed: {
            title: "animu in my city",
            image: {
                url: body.url
            },
            color: this.bot.utils.color
        }});
    }
}

module.exports = AnimuPictureCommand;