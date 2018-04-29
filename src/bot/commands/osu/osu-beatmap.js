const Command = require('../../structures/BaseCommand');

class OsuBeatmapCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'osu-beatmap',
            desc: 'Get some information on a beatmap.',
            usage: 'osu-beatmap [id]',
            aliases: [
                'osu!beatmap',
                'osu!b',
                'osub'
            ],
            examples: [
                'k;osu!beatmap 131891'
            ],
            category: 'osu!'
        });
    }

    async execute(msg, args) {
        if (!args[0]) return msg.channel.createMessage('<:OwOThink:439675032910954496> **|** Must provide a beatmap id!');
        await this.bot.utils.retriveOsuBeatmap(this.bot, msg, args[0]);
    }
}

module.exports = OsuBeatmapCommand;