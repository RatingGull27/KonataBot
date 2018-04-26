exports.handle = (bot, channel, guild) => {
    return new Promise((resolve, reject) => {
		if (/^\d+$/.test(channel)) {
			if (guild) {
				if (!guild.channels.has(channel)) reject();
				resolve(guild.channels.get(channel));
			} else {
				const channel = channel in bot.channelGuildMap && bot.guilds.get(bot.channelGuildMap[channel]).channels.get(channel);
				if (channel) return resolve(channel);
			}
		} else if (/^<#(\d+)>$/.test(channel)) {
			const match = channel.match(/^<#(\d+)>$/);
			if (guild) {
				if (!guild.channels.has(match[1])) reject();
				resolve(guild.channels.get(match[1]));
			} else {
				const channel = match[1] in bot.channelGuildMap && bot.guilds.get(bot.channelGuildMap[match[1]]).channels.get(match[1]);
				if (channel) return resolve(channel);
			}
		} else if (guild) {
			const channels = guild.channels.filter((channel) => channel.name.toLowerCase().includes(channel.toLowerCase()));
			if (channels.length > 0) return resolve(channels[0]);
		}
		reject();
	});
}