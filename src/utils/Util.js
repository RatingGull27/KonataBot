module.exports = {
    /**
     * Konata's embed colour.
     * 
     * @returns {Number} the number of the color.
     */
    color: 12021369,
    /**
     * Formats the bot's description (For the `help` command.)
     * 
     * @param {KonataClient} bot The bot.
     * @returns {String} The string.
     */
    formatHelp: (bot, prefix) => {
        const str = `__**Konata's Commands**__\n\t<:konataHi:743078005945008138> Hello! I'm Konata Izumi, your helper.\n\t<:konataowo:743078005978693683> To get extended help, do \`${prefix}help [command]\` or \`@Konata Izumi#8012 help [command]\`\n\t<:konataok:710895044902649996> To execute a command, do \`${prefix}<command>\` or \`@Konata Izumi#8012 <command>\``;
        return str;
    },
    /**
     * Makes more functionality...
     * 
     * @param {Eris} Eris the Eris package.
     * @returns {Eris|void} The thing adding `TextChannel#awaitMessages` and `Channel#dm` functions.
     */
    initEris: (Eris) => {
        Object.defineProperties(Eris.Channel.prototype, {
            'dm': {
                get() {
                    return this.type === 1;
                }
            }
        });

        return Eris;
    },
    /**
     * A utility to make a codeblock.
     * 
     * @param {String} lang The language to put it as.
     * @param {String} owo The text
     * @returns {String} The string.
     */
    codeblock: (lang, owo) => {
        const block = `${'```'}${lang || ''}\n${owo}\n${'```'}`;
        return block;
    },
    /**
     * Format a duration.
     * 
     * @param {Number|String} ms The seconds to parse.
     * @returns {String} The parsed date.
     */
    formatDuration: (ms) => {
		const sec = Math.floor((ms / 1000) % 60).toString();
		const min = Math.floor((ms / (1000 * 60)) % 60).toString();
        const hrs = Math.floor(ms / (1000 * 60 * 60)).toString();
        const days = Math.floor(ms / (1000 * 60 * 60 * 24)).toString();
        return `${days.padStart(2, '0')}:${hrs.padStart(2, '0')}:${min.padStart(2, '0')}:${sec.padStart(2, '0')}`;
    },
    /**
     * Shorten something!
     * 
     * @param {String} text The text to shorten.
     * @param {Number} maxLength the max to go off.
     * @returns {String} The string. (Formatted or stayed the same.)
     */
    shorten: (text, maxLength = 2000) =>  {
        return text.length > maxLength ? `${text.substr(0, maxLength - 3)}...` : text;
    },
    /**
     * Trim an array.
     * 
     * @param {Array<any>} arr The array.
     * @param {Number} maxLen The max of the length is.
     */
    trimArray: (arr, maxLen = 10)  => {
        if (arr.length > maxLen) {
			const len = arr.length - maxLen;
			arr = arr.slice(0, maxLen);
			arr.push(`${len} more...`);
		}
        return arr;
    },
    /**
     * Sleep function (in Java: Thread#sleep)
     * 
     * @param {Number} ms The time in milliseconds
     * @returns {Promise<void>} The thing sleeping.
     */
    sleep: (ms) => new Promise(res => setTimeout(res, ms)),
    retriveOsuUser: (bot, msg, user, mode, modeName = 'standard') => {
        bot.snek.get(`https://osu.ppy.sh/api/get_user?k=${bot.config.tokens.osu}&u=${user}&m=${mode}`)
        .then(res => {
            // Lemmmy photo
            const lemmmy = `http://lemmmy.pw/osusig/sig.php?colour=pink&uname=${user}&mode=${mode}&pp=1&countryrank&onlineindicator=undefined`;
            const data = res.body[0];

            msg.channel.createMessage({ embed: {
                title: "Konata Izumi » osu! Statistics",
                description: `Here is **${data.username}** (ID: **${data.user_id}**)'s osu!${modeName} statistics:`,
                fields: [{
                    name: "» User Catched Beats",
                    value: `• **300**: ${data.count300}\n• **100**: ${data.count100}\n• **50**: ${data.count50}`,
                    inline: true
                },
                {
                    name: "» Other",
                    value: `• **Play Count**: ${data.playcount}\n• **Ranked/Total Score**: ${data.ranked_score}/${data.total_score}\n• **PP/PP Rank**: ${data.pp_raw}/${data.pp_rank}\n• **Country/PP Country Rank**: ${data.country}/${data.pp_country_rank}`,
                    inline: true
                },
                {
                    name: "» SS, S, A Counts",
                    value: `• **SS**: ${data.count_rank_ss}\n• **S**: ${data.count_rank_s}\n• **A**: ${data.count_rank_a}`,
                    inline: true
                },
                {
                    name: "» Accuracy",
                    value: `${data.accuracy}%`,
                    inline: true
                }],
                color: bot.utils.color,
                image: {
                    url: lemmmy
                }
                }});
            })
            .catch(e => {
                msg.channel.createMessage(bot.utils.codeblock('js', e.stack));
            });
    },
    retriveOsuBeatmap: (bot, msg, id) => {
        bot.snek.get(`https://osu.ppy.sh/api/get_beatmaps?k=${bot.config.tokens.osu}&b=${id}`)
            .then(res => {
                const data = res.body[0];

                msg.channel.createMessage({ embed: {
                    title: "Konata Izumi » osu!beatmap statistics",
                    description: `Here is **${data.artist} – ${data.title}** (ID: **${data.beatmap_id}**)'s beatmaps information:`,
                    fields: [{
                        name: "» Beatmap Information",
                        value: `• **Total Length**: ${data.total_length}\n• **Hit Length**: ${data.hit_length}\n• Who created it?\n\t• **User**: ${data.creator} (\`${bot.config.prefix}osu-user standard ${data.creator}\`)\n• **BPM**: ${data.bpm}\n• **Max Combo**: ${data.max_combo}\n• **Play/Pass Count**\n\t• **Play**: ${data.playcount}\n\t• **Pass**: ${data.passcount}`
                    }],
                    color: bot.utils.color
                }});
            })
            .catch(e => {
                msg.channel.createMessage(bot.utils.codeblock('js', e.stack));
            });
    },
    retriveOsuBest: (bot, msg, user) => {
        bot.snek.get(`https://osu.ppy.sh/api/get_user_best?k=${bot.config.tokens.osu}&u=${user}&type=string&limit=5`)
            .then(res => {
                const data1 = res.body[0];
                const data2 = res.body[1];
                const data3 = res.body[2];
                const data4 = res.body[3];
                const data5 = res.body[4];

                msg.channel.createMessage({
                    embed: {
                        title: "Konata Izumi » osu!best statistics",
                        description: `Here is **${user}**'s best statistics so far:`,
                        fields: [{
                            name: "» Best Scores (#1)",
                            value: `\`\`\`ini\n[ #1 ]\n• Beatmap ID: ${data1.beatmap_id} (${bot.config.prefix}osu!beatmap ${data1.beatmap_id})\n• Counts:\n\t• 50: ${data1.count50}\n\t• 100: ${data1.count100}\n\t• 300: ${data1.count300}\n• Date: ${new Date(data1.date).toDateString()}\n• Rank: ${data1.rank}\n• PP Gained: ${data1.pp}\`\`\``
                        },
                        {
                            name: "» Best Scores (#2)",
                            value: `\`\`\`ini\n[ #2 ]\n• Beatmap ID: ${data2.beatmap_id} (${bot.config.prefix}osu!beatmap ${data2.beatmap_id})\n• Counts:\n\t• 50: ${data2.count50}\n\t• 100: ${data2.count100}\n\t• 300: ${data2.count300}\n• Date: ${new Date(data2.date).toDateString()}\n• Rank: ${data2.rank}\n• PP Gained: ${data2.pp}\`\`\``
                        },
                        {
                            name: "» Best Scores (#3)",
                            value: `\`\`\`ini\n[ #3 ]\n• Beatmap ID: ${data3.beatmap_id} (${bot.config.prefix}osu!beatmap ${data3.beatmap_id})\n• Counts:\n\t• 50: ${data3.count50}\n\t• 100: ${data3.count100}\n\t• 300: ${data3.count300}\n• Date: ${new Date(data3.date).toDateString()}\n• Rank: ${data3.rank}\n• PP Gained: ${data3.pp}\`\`\``
                        },
                        {
                            name: "» Best Scores (#4)",
                            value: `\`\`\`ini\n[ #4 ]\n• Beatmap ID: ${data4.beatmap_id} (${bot.config.prefix}osu!beatmap ${data4.beatmap_id})\n• Counts:\n\t• 50: ${data4.count50}\n\t• 100: ${data4.count100}\n\t• 300: ${data4.count300}\n• Date: ${new Date(data4.date).toDateString()}\n• Rank: ${data4.rank}\n• PP Gained: ${data4.pp}\`\`\``
                        },
                        {
                            name: "» Best Scores (#5)",
                            value: `\`\`\`ini\n[ #5 ]\n• Beatmap ID: ${data5.beatmap_id} (${bot.config.prefix}osu!beatmap ${data5.beatmap_id})\n• Counts:\n\t• 50: ${data5.count50}\n\t• 100: ${data5.count100}\n\t• 300: ${data5.count300}\n• Date: ${new Date(data5.date).toDateString()}\n• Rank: ${data5.rank}\n• PP Gained: ${data5.pp}\`\`\``
                        }],
                        color: bot.utils.color
                    }
                });
            })
            .catch(e => {
                msg.channel.createMessage(bot.utils.codeblock('js', e.stack));
            });
    },
    removeDuplicateArray: (array) => {
        return Array.from(new Set(array).values());
    },
  flatten: (obj, ...props) => {
        const isObject = d => typeof d === 'object' && d !== null;
        if (!isObject(obj)) return obj;

        props = Object.assign(...Object.keys(obj).filter(k => !k.startsWith('_')).map(k => ({ [k]: true })), ...props);

        const out = {};

        for (let [prop, newProp] of Object.entries(props)) {
            if (!newProp) continue;
            newProp = newProp === true ? prop : newProp;

            const element = obj[prop];
            const elemIsObj = isObject(element);
            const valueOf = elemIsObj && typeof element.valueOf === 'function' ? element.valueOf() : null;

            // If it's a collection, make the array of keys
            if (element instanceof require('./Collection')) out[newProp] = Array.from(element.keys());
            // If it's an array, flatten each element
            else if (Array.isArray(element)) out[newProp] = element.map(e => Util.flatten(e));
            // If it's an object with a primitive `valueOf`, use that value
            else if (valueOf && !isObject(valueOf)) out[newProp] = valueOf;
            // If it's a primitive
            else if (!elemIsObj) out[newProp] = element;
        }

        return out;
    }
};