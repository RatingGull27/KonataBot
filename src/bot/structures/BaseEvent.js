class BaseEvent {
    constructor(client, {
        name = null
    }) {
        this.uwu = { name };
        this.bot = client;
    }
}

module.exports = BaseEvent;