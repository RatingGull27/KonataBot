module.exports = (bot, role, guild) => {
	return new Promise((resolve, reject) => {
		if (/^\d+$/.test(role)) {
			const role = guild.roles.get(role);
			if (role) return resolve(role);
		} else if (/^<@&(\d+)>$/.test(role)) {
			const match = role.match(/^<@&(\d+)>$/);
			const role = guild.roles.get(match[1]);
			if (role) return resolve(role);
		} else {
			const roles = guild.roles.filter((role) => role.name.toLowerCase().includes(role.toLowerCase()));
			if (roles.length > 0) return resolve(roles[0]);
		}
		reject();
    });
}