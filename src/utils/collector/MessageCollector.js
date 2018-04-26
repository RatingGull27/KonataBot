const Emitter = require('events').EventEmitter;

module.exports = class MessageCollector extends Emitter {
    constructor(bot, channel, filter, options = {}) {
        super();

        this.filter = filter;
        this.chan = channel;
        this.options = options;
        this.ended = false;
        this.collections = [];
        this.bot = bot;
        this.listeners = (msg) => this.verify(msg);

        this.bot.on('messageCreate', this.listeners);
        if (options.time) {
            setTimeout(() => this.stop(time), options.time);
        }
    }

    /**
     * Verify the message that the collector is saying
     * 
     * @param {Object} msg Your message paramter
     * @return {Promise<void>} The awaitted message
     */
    verify(msg) {
        if (this.channel.id !== msg.channel.id) return;

        if (this.filter(msg)) {
            this.collections.push(msg);

            this.emit('message', msg);

            if (this.collections >= this.options.maxMatches) {
                this.stop('maxMatches');
            }
            
            return true;
        }

        return false;
    }

    /**
     * Stop the collector
     * 
     * @param {String} reason The reason to stop.
     * @return {void} Stops it
     */
    stop(reason = '') {
        if (this.ended) return;

        this.ended = true;
        this.bot.removeListener('messageCreate', this.listeners);

        this.emit('end', this.collections, reason)
    }
}