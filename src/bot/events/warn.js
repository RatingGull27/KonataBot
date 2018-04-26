const Event = require('../structures/BaseEvent');

class WarnEvent extends Event {
    constructor(client) {
        super(client, {
            name: 'warn'
        });
    }

    execute(owo) {
        this.bot.log.warn(`Warning: ${owo.stack}`);
    }
}

module.exports = WarnEvent;