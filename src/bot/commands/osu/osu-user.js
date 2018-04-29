const Command = require('../../structures/BaseCommand');

class OSUUserCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'osu-user',
            desc: 'Searches an osu! player.',
            usage: 'osu [mode] [data]',
            aliases: [
                'osu!user'
            ],
            examples: [
                'k;osu-data ctb ohlookitsAugust',
                'konata osu! standard ohlookitsderpy'
            ],
            category: 'osu!'
        });
    }

    async execute(msg, args) {
        if (!args[0]) return msg.channel.createMessage('<:KonataYawn:438856268338298881> **|** Specify a game mode. (Avaliable ones: `standard`, `taiko`, `ctb`, `mania`)');
        if (args[0] && !args[1]) return msg.channel.createMessage('<:KonataYawn:438856268338298881> **|** I can\'t search a user without one!');

        switch(args[0]) {
            case "ctb":
            case "catch-the-beat":
                this.bot.utils.retriveOsuUser(this.bot, msg, args[1], 2, 'ctb');
                break;
            case "taiko":
            case "drums":
                this.bot.utils.retriveOsuUser(this.bot, msg, args[1], 1, 'taiko');
                break;
            case "standard":
                this.bot.utils.retriveOsuUser(this.bot, msg, args[1], 0);
                break;
            case "mania":
                this.bot.utils.retriveOsuUser(this.bot, msg, args[1], 3, 'mania');
                break;
        }
    }
}

module.exports = OSUUserCommand;