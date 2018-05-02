const Command = require('../../structures/BaseCommand');
const DatabaseError = require('../../../errors/DatabaseError');

class BalanceCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'balance',
            desc: 'Sees how much a person or yourself has "x" many hentai coins!',
            usage: 'balance [@mention]',
            aliases: [
                'coins',
                'bal'
            ],
            examples: [
                '{prefix}balance @Melmsie#0002',
                '{prefix}coins'
            ],
            category: 'Economy'
        });
    }

    async execute(msg, args) {
        this.bot.r.table('users').get(msg.author.id).run((err, entry) => {
            if (err) new DatabaseError(this.bot, err);

            if (msg.mentions[0]) {
                this.bot.r.table('users').get(msg.mentions[0].id).run((e, owo) => {
                    if (err) new DatabaseError(this.bot, e);
                    msg.channel.createMessage(`<:HentaiCoin:440234482587402240> **|** <@${msg.mentions[0].id}> has \`${owo.economy.coins}\` coins.`);
                });
            } else {
                msg.channel.createMessage(`<:HentaiCoin:440234482587402240> **|** You have \`${entry.economy.coins}\` coins.`);
            }
        });
    }
}

module.exports = BalanceCommand;