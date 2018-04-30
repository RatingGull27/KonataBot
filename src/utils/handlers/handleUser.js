module.exports = (bot, user) => {
    return new Promise((resolve, reject) => {
		if (/^\d+$/.test(user)) {
			const user = bot.users.get(user);
			if (user) return resolve(user);
		} else if (/^<@!?(\d+)>$/.test(user)) {
			const match = user.match(/^<@!?(\d+)>$/);
			const user = bot.users.get(match[1]);
			if (user) return resolve(user);
		} else if (/^(.+)#(\d{4})$/.test(user)) {
			const match = user.match(/^(.+)#(\d{4})$/);
			const users = bot.users.filter((user) => user.username === match[1] && Number(user.discriminator) === Number(match[2]));
			if (users.length > 0) return resolve(users[0]);
		} else {
			const users = bot.users.filter((user) => user.username.toLowerCase().includes(user.toLowerCase()));
			if (users.length > 0) return resolve(users[0]);
		}
		reject();
    });
}