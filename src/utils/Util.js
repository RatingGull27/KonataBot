module.exports = {
    color: 3877972,
    formatHelp: (bot) => {
        const str = `__**Konata's Commands**__\n\t<:KonataHi:438518453083701249> Hello! I'm Konata, your helper.\n\t<:KonataOwO:438519335556874240> To get extended help, do \`konata!help [command]\` or \`@Konata#2684 help [command]\`\n\t<:KonataOk:438856307580338176> To execute a command, do \`konata!<command>\` or \`@Konata#2684 <command>\``;
        return str;
    },
    initEris: (Eris) => {
        const MessageCollector = require('./collector/MessageCollector');

        Object.defineProperty(Eris.Channel.prototype, 'awaitMessages', {
            value: (bot, filter, options) => {
                const collector = new MessageCollector(bot, this, filter, options);
                return new Promise(res => {
                    collector.on('end', (...args) => {
                        res(args);
                    });
                });
            }
        });

        Object.defineProperties(Eris.Channel.prototype, {
            'dm': {
                get() {
                    return this.type === 1;
                }
            }
        });
    },
    codeblock: (lang, owo) => {
        const block = `${'```'}${lang || ''}\n${owo}\n${'```'}`;
        return block;
    }
};