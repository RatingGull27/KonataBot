module.exports = (bot, err, msg) => {
    if (msg) return msg.channel.createMessage('<:KonataCry:438856292178591745> **|** An error has occured while querying that into my database! The developers are on the lookout.');
    bot.webhook.createMessage({
        title: "Konata Izumi » Database Error",
        description: `<@${bot.config.devs[0]}>: An error has occured:`,
        fields: [{
            name: "» Error",
            value: bot.utils.shorten(err.stack, 1024)
        }],
        color: bot.utils.color
    });
}