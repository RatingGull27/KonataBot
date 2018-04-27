const Event = require('../structures/BaseEvent');

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
            name: `${bot.config.prefix}help | [${bot.guilds.size}] | Hewwo~`,
            type: 0
        });
        bot.webhook.createMessage({
            title: "Konata Izumi ;; Connected via Discord",
            description: "Hello! I connected via Discord.",
            color: bot.utils.color
        });
    }
}

module.exports = ReadyEvent;