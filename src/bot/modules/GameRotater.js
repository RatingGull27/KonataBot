const games = require('../../assets/games.json');

exports.rotate = (bot) => {
    bot.editStatus('online', {
        name: `${bot.config.prefix}help | [${this.bot.guilds.size.toLocaleString()}] | ${games[Math.floor(Math.random() * games.length)]}`
    });
}