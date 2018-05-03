class DatabaseError {
    constructor(bot, error, msg) {
        this.bot = bot;
        this.error = error;
        this.msg = msg;

        if (this.msg) {
            msg.channel.createMessage(':x: **|** An error has occured while doing that database query.');
        }

        this.bot.log.error(`\n${err.stack}`);
    }
}

module.exports = DatabaseError;