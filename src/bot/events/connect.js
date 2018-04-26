const Event = require('../structures/BaseEvent');

class ConnectedEvent extends Event {
    constructor(bot) {
        super(bot, {
            name: 'connect'
        });
    }

    execute(id) {
        this.bot.log.custom(`SHARD ${id}`, 'Connected!');
    }
}

module.exports = ConnectedEvent;