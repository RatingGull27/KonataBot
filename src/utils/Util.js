const yes = ['yes', 'yus', 'yas']
const no = ['nuuu', 'no', 'nada'];

module.exports = {
    color: 3877972,
    formatHelp: (bot) => {
        const str = `__**Konata's Commands**__\n\t<:KonataHi:438518453083701249> Hello! I'm Konata, your helper.\n\t<:KonataOwO:438519335556874240> To get extended help, do \`konata!help [command]\` or \`@Konata#2684 help [command]\`\n\t<:KonataOk:438856307580338176> To execute a command, do \`konata!<command>\` or \`@Konata#2684 <command>\``;
        return str;
    },
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
    codeblock: (lang, owo) => {
        const block = `${'```'}${lang || ''}\n${owo}\n${'```'}`;
        return block;
    },
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
    formatDuration: (ms) => {
		const sec = Math.floor((ms / 1000) % 60).toString();
		const min = Math.floor((ms / (1000 * 60)) % 60).toString();
        const hrs = Math.floor(ms / (1000 * 60 * 60)).toString();
        const days = Math.floor(ms / (1000 * 60 * 60 * 24)).toString();
        return `${days.padStart(2, '0')}${hrs.padStart(2, '0')}:${min.padStart(2, '0')}:${sec.padStart(2, '0')}`;
    }
};