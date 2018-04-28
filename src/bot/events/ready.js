const Event = require('../structures/BaseEvent');
const games = require('../../assets/games.json');

class ReadyEvent extends Event {
    constructor(bot) {
        super(bot, {
            name: 'ready'
        });
    }

    execute() {
        const { bot } = this;

        bot.log.info('Konata Izumi has connected via Discord!');
        bot.editStatus('online', {
            name: `${bot.config.prefix}help | [${bot.guilds.size}] | ${games[Math.floor(Math.random() * games.length)]}`,
            type: 0
        });
        setInterval(() => {
            bot.editStatus('online', {
                name: `${bot.config.prefix}help | [${bot.guilds.size}] | ${games[Math.floor(Math.random() * games.length)]}`,
                type: 0
            }, 60000);
        });
        bot.webhook.createMessage({
            title: "Konata Izumi ;; Connected via Discord",
            description: "Hello! I connected via Discord.",
            fields: [{
                name: "Statistics",
                value: `\`\`\`ini\n[ Konata Izumi's Statistics ]\nShards: ${this.bot.shards.size}\nGuilds: ${this.bot.guilds.size}\nUsers: ${this.bot.users.size}\`\`\``
            }],
            color: bot.utils.color
        });
    }
}

module.exports = ReadyEvent;