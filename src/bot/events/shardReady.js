const BaseEvent = require('../structures/BaseEvent');

class ShardReadyEvent extends BaseEvent {
    constructor(bot) {
        super(bot, {
            name: 'shardReady'
        });
    }

    execute(id) {
        this.bot.log.info(`Shard ${id}: Connected!`);
    }
}

module.exports = ShardReadyEvent;