const Collector = require('./interfaces/Collector');

class MessageCollector extends Collector {
  constructor(channel, filter, options = {}) {
    super(channel.client, filter, options);

    this.channel = channel;

    this.received = 0;

    const bulkDeleteListener = (messages => {
      for (const message of messages.values()) this.handleDispose(message);
    }).bind(this);

    this.client.on('messageCreate', this.handleCollect);
    this.client.on('messageDelete', this.handleDispose);
    this.client.on('messageDeleteBulk', bulkDeleteListener);

    this.once('end', () => {
      this.client.removeListener('messageCreate', this.handleCollect);
      this.client.removeListener('messageDelete', this.handleDispose);
      this.client.removeListener('messageDeleteBulk', bulkDeleteListener);
    });
  }

  collect(message) {
    if (message.channel.id !== this.channel.id) return null;
    this.received++;
    return message.id;
  }

  dispose(message) {
    return message.channel.id === this.channel.id ? message.id : null;
  }

  /** @private */
  endReason() {
    if (this.options.max && this.collected.size >= this.options.max) return 'limit';
    if (this.options.maxProcessed && this.received === this.options.maxProcessed) return 'processedLimit';
    return null;
  }
}

module.exports = MessageCollector;