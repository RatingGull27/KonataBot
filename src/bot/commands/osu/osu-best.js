const Command = require('../../structures/BaseCommand');

class OsuBestCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'osu-best',
            desc: 'Get some information on the best user. (Recent beatmaps they played.)',
            usage: 'osu-best [user]',
            aliases: [
                'osu!best',
                'osu!be',
                'osube'
            ],
            examples: [
                'k;osu!best WubWoofWolf'
            ],
            category: 'osu!'
        });
    }

    async execute(msg, args) {
        if (!args[0]) return msg.channel.createMessage('<:OwOThink:439675032910954496> **|** Must provide a user!');
        await this.bot.utils.retriveOsuBest(this.bot, msg, args[0]);
    }
}

module.exports = OsuBestCommand;