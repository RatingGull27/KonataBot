const Command = require('../../structures/BaseCommand');

class CasinoCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'casino',
            desc: 'Gamble all of your hentai coins to get more or to loose!',
            usage: 'casino [coins]',
            aliases: [
                'gamble'
            ],
            examples: [
                '{prefix}gamble 500'
            ],
            category: 'Economy'
        });
    }

    async execute(msg, args) {
        const uConfig = await this.bot.r.table('users').get(msg.author.id).run();
        let bet = args[0];

        if (!bet) return msg.channel.createMessage(`:x: **|** How can you gamble your coins if you didn't specify none!`);
        if (bet < 10) return msg.channel.createMessage(`:x: **|** The bet must be over 10 coins.`);
        if (isNaN(bet)) {
            if (bet === 'all') {
                bet = uConfig.economy.coins;
            } else if (bet === 'half') {
                bet = Math.round(uConfig.economy.coins / 2);
            } else {
                msg.channel.createMessage(`:x: **|** Try to do real coins!`);
                return;
            }
        }
        if (Number.isInteger(bet)) return msg.channel.createMessage(`:x: **|** The bet requires a whole number!`);
        if (uConfig.economy.coins === 0) return msg.channel.createMessage(`:x: **|** You have no coins to gamble!`);

        if (Math.random() >= 0.65) {
            let winningChance = (Math.random() * 0.95) + 1;
            const winnings = Math.round(bet * winningChance);

            if (winnings === bet) return msg.channel.createMessage(`:weary: **|** You broke even!`);
            this.bot.r.table('users').get(msg.author.id).update({
                economy: {
                    coins: winnings
                }
            }).run();
            msg.channel.createMessage(`:tada: **|** You won \`${winnings}\` coins!`);
        } else {
            let owo = Math.max(0, uConfig.economy.coins - bet);
            this.bot.r.table('users').get(msg.author.id).update({
                economy: {
                    coins: owo
                }
            }).run();
            msg.channel.createMessage(`:thinking: **|** Lost \`${owo}\` coins...`);
        }
    }
}

module.exports = CasinoCommand;