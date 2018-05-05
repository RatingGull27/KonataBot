module.exports = (bot, guild) => {
    return new Promise((resolve, reject) => {
		if (/^\d+$/.test(guild)) {
			const guild = bot.guilds.get(guild);
			if (guild) return resolve(guild);
		} else {
			const guilds = bot.guilds.filter((guild) => guild.name.toLowerCase().includes(guild.toLowerCase()));
			if (guilds.length > 0) return resolve(guilds[0]);
		}
		reject();
    });
}