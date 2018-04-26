const Event = require('../structures/BaseEvent');

class DisconnectedEvent extends Event {
    constructor(bot) {
        super(bot, {
            name: 'disconnect'
        });
    }

    execute() {
        this.bot.log.warn(`Konata Izumi has been disconnected! Reconnecting...`);
    }
}

module.exports = DisconnectedEvent;