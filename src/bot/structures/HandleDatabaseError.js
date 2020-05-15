/**
 * Executes something if the bot has an error while executing a DB thing.
 * 
 * @param {KonataClient} bot The bot client
 * @param {Error} err Node.JS Error
 * @param {Eris.Message} msg Eris' Message paramter.
 * @deprecated Using `DatabaseError`. (Located at `src/errors`)
 */
module.exports = (bot, err, msg) => {
    if (msg) return msg.channel.createMessage('<:konatacry:710895046492160080> **|** An error has occured while querying that into my database! The developers are on the lookout.');
    bot.createMessage({
        title: "Konata Izumi » Database Error",
        description: `<@${bot.config.devs[0]}>: An error has occured:`,
        fields: [{
            name: "» Error",
            value: bot.utils.shorten(err.stack, 1024)
        }],
        color: bot.utils.color
    });
}