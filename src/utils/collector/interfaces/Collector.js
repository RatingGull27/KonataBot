const Collection = require('../../other/Collection');
const Util = require('../../Util');
const EventEmitter = require('events');

class Collector extends EventEmitter {
  constructor(client, filter, options = {}) {
    super();

    Object.defineProperty(this, 'client', { value: client });
    this.filter = filter;
    this.options = options;
    this.collected = new Collection();
    this.ended = false;
    this._timeout = null;
    this.handleCollect = this.handleCollect.bind(this);
    this.handleDispose = this.handleDispose.bind(this);

    if (options.time) this._timeout = this.client.setTimeout(() => this.stop('time'), options.time);
  }

  handleCollect(...args) {
    const collect = this.collect(...args);

    if (collect && this.filter(...args, this.collected)) {
      this.collected.set(collect, args[0]);

      /**
       * Emitted whenever an element is collected.
       * @event Collector#collect
       * @param {...*} args The arguments emitted by the listener
       */
      this.emit('collect', ...args);
    }
    this.checkEnd();
  }

  handleDispose(...args) {
    if (!this.options.dispose) return;

    const dispose = this.dispose(...args);
    if (!dispose || !this.filter(...args) || !this.collected.has(dispose)) return;
    this.collected.delete(dispose);

    this.emit('dispose', ...args);
    this.checkEnd();
  }

  get next() {
    return new Promise((resolve, reject) => {
      if (this.ended) {
        reject(this.collected);
        return;
      }

      const cleanup = () => {
        this.removeListener('collect', onCollect);
        this.removeListener('end', onEnd);
      };

      const onCollect = item => {
        cleanup();
        resolve(item);
      };

      const onEnd = () => {
        cleanup();
        reject(this.collected); // eslint-disable-line prefer-promise-reject-errors
      };

      this.on('collect', onCollect);
      this.on('end', onEnd);
    });
  }

  stop(reason = 'user') {
    if (this.ended) return;

    if (this._timeout) this.client.clearTimeout(this._timeout);
    this.ended = true;

    this.emit('end', this.collected, reason);
  }

  checkEnd() {
    const reason = this.endReason();
    if (reason) this.stop(reason);
  }

  toJSON() {
    return Util.flatten(this);
  }

  collect() {}

  dispose() {}

  endReason() {}
}

module.exports = Collector;