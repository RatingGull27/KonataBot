const r = require('express').Router();

module.exports = (bot, guild) => {
    r.get('dashboard', async(req, res) => {
        const guild = await bot.r.table('guilds').get(guild.id).run();

        res.send(`GUILD ${guild.name}:\n\tPrefix: ${guild.prefix || 'k.'}`); // Kinda shitty but will be fixed.
    });
}