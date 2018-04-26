class Website {
    constructor(bot, r) {
        this.bot = bot;
        this.r = r;
        this.website = require('./core/Website')(bot, r);
    }

    connect() {
        this.website.connect();
    }
}

module.exports = Website;