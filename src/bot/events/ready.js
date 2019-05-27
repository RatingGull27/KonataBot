const Event = require('../structures/BaseEvent');
const games = require('../../assets/games.json');
const Website = require('../../../website/Website');

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
            name: ` | [${bot.guilds.size}] | ${games[Math.floor(Math.random() * games.length)]}`,
            type: 0
        });
        setInterval(() => {
            bot.editStatus('online', {
                name: ` | [${bot.guilds.size}] | ${games[Math.floor(Math.random() * games.length)]}`,
                type: 0
            });
        }, 60000);
        bot.utils.sleep(30000);
        Website(bot);
    }
}

module.exports = ReadyEvent;