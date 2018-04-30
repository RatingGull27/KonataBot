const Command = require('../../structures/BaseCommand');

class BotListCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'botlist',
            desc: 'Gives some information on a bot from discordbots.org; Will be disabled if there isn\'t an api key.',
            usage: 'botlist [@bot_mention]',
            aliases: [
                'dbl'
            ],
            examples: [
                'konata botlist @Yui Hirasawa#0629'
            ],
            category: 'Utility'
        });
    }

    async execute(msg, args) {
        const { shorten, color, codeblock } = this.bot.utils;
        if (!this.bot.config.tokens.oliyBots) return msg.channel.createMessage(':x: **|** `discordbots.org` API not avaliable.');
        if (!args[0]) return msg.channel.createMessage(':x: **|** I can\'t search a bot if I don\'t have a bot specified.');
        let id = 0;

        if (msg.mentions[0]) {
            id = msg.mentions[0].id;
        } else {
            id = args[0];
        }

        this.bot.snek
            .get(`https://discordbots.org/api/bots/${id}`)
            .set('Authorization', this.bot.config.tokens.oliyBots)
            .then(res => {
                const body = res.body;

                msg.channel.createMessage({ embed: {
                    title: "Konata Izumi » Bot Info",
                    description: `Here is some information on **<@${id}>**:`,
                    fields: [{
                        name: "» Description",
                        value: `${shorten(body.shortdesc)}`,
                        inline: false
                    },
                    {
                        name: "» Bot Information",
                        value: `• **Tag**: \`${body.username}#${body.discriminator}\n• **Server Count**: ${typeof body.server_count === 'number' ? body.server_count : 'Bot isn\'t posting server count.'}\n• **Monthly/Total Upvotes**:\n\t• **Monthly**: ${body.monthlyPoints}\n\t• **Total**: ${body.points}\n• **Tags**: \`${body.tags.join("`, `")}\`\n• **Prefix**: ${body.prefix}\n• **Library**: ${body.lib}\n• **Owners**\n\t• <@${body.owners.join(">\n\t• <@")}>`
                    }],
                    color
                }});
            })
            .catch(e => {
                if (e.status === '404') return msg.channel.createMessage(':x: **|** Bot not found.');
                msg.channel.createMessage(":x: **|** An error has occured while pulling that bot." + codeblock('js', e.stack));
            });
    }
}

module.exports = BotListCommand;