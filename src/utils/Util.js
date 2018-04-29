const yes = ['yes', 'yus', 'yas']
const no = ['nuuu', 'no', 'nada'];

module.exports = {
    /**
     * Konata's embed colour.
     * 
     * @returns {Number} the number of the color.
     */
    color: 3877972,
    /**
     * Formats the bot's description (For the `help` command.)
     * 
     * @param {KonataClient} bot The bot.
     * @returns {String} The string.
     */
    formatHelp: (bot) => {
        const str = `__**Konata's Commands**__\n\t<:KonataHi:438518453083701249> Hello! I'm Konata, your helper.\n\t<:KonataOwO:438519335556874240> To get extended help, do \`${bot.config.prefix}help [command]\` or \`@Konata#2684 help [command]\`\n\t<:KonataOk:438856307580338176> To execute a command, do \`${bot.config.prefix}<command>\` or \`@Konata#2684 <command>\``;
        return str;
    },
    /**
     * Makes more functionality...
     * 
     * @param {Eris} Eris the Eris package.
     * @returns {Eris|void} The thing adding `TextChannel#awaitMessages` and `Channel#dm` functions.
     */
    initEris: (Eris) => {
        const MessageCollector = require('./collector/MessageCollector');

        Object.defineProperty(Eris.Channel.prototype, 'awaitMessages', {
            value: (bot) => {
                const collector = new MessageCollector(bot);
                return new Promise(res => {
                    collector.on('end', (...args) => {
                        res(args);
                    });
                });
            }
        });

        Object.defineProperty(Eris.TextChannel.prototype, 'awaitMessages', {
            async value(bot, predicate, options = {}) {
                const collector = new MessageCollector(bot);
                return await collector.awaitMessages(predicate, options, this.id);
            }
        });

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
     * Verify an message in a {@see Eris.TextChannel} text channel.
     * 
     * @param {KonataClient} bot The bot client.
     * @param {Eris.User} user The user.
     * @param {Number} timer The timer to go by.
     * @param {Eris.TextChannel} channel The text channel.
     * @returns {void} I don't even know man.
     */
    verify: (bot, user, timer = 30000, channel) => {
        const filter = (res) => {
            res.author.id === user.id || res.content === 'cancel'
        }
        const uwu = channel.awaitMessages(bot, filter, {
            timeout: timer
        });

        if (!uwu || uwu.content === 'cancel') return false;
        const content = uwu.content.toLowerCase();
        if (yes.includes(content)) return true;
        if (no.includes(content)) return false;
        return false;
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
    sleep: (ms) => new Promise(res => setTimeout(res, ms))
};