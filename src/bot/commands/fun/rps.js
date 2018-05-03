const Command = require('../../structures/BaseCommand');

class RockPaperScissorsCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'rps',
            desc: 'Play some Rock Paper Scissors to get hentai coins!',
            usage: 'rps [choice]',
            aliases: [
                'rock-paper-scissors'
            ],
            examples: [
                '{prefix}rps Rock',
                '{prefix}rock-paper-scissors Paper'
            ],
            category: 'Minigames',
            cooldown: 10,
            enabled: false
        });

        this.choices = ['rock', 'paper', 'scissors'];
    }

    async run(msg, args) {
        const uConfig = await this.bot.r.table('users').get(msg.author.id).run();
        if (!this.choices.includes(args[0])) {
            msg.channel.createMessage(":x: **|** Must choose `rock`, `paper`, or `scissors`!");
            return;
        }

        const choice = args[0];
        const res = this.choices[Math.floor(Math.random() * this.choices.length)];

        if (choice === 'rock') {
            if (res == 'rock') {
                msg.channel.createMessage(":thinking: **|** We both got `rock`; So it's a tie!");
                return;
            } else if (res === 'scissors') {
                let winningChance = (Math.random() * 0.95) + 1;
                const winnings = Math.round(uConfig.ecomony.coins * winningChance);
                msg.channel.createMessage(':thinking: **|** I lost, so here is `+' + winnings + '` hentai coins!');
                this.bot.r.table('users').get(msg.author.id).update({
                    ecomony: {
                        coins: winnings
                    }
                }).run();
                return;
            } else if (res === 'paper') {
                msg.channel.createMessage(':tada: **|** Yay! I won, since I am so nice, I\'m gonna let you keep your hentai coins.');
                return;
            }
        } else if (choice === 'paper') {
            if (res === 'rock') {
                let winningChance = (Math.random() * 0.95) + 1;
                const winnings = Math.round(uConfig.ecomony.coins * winningChance);
                msg.channel.createMessage(':thinking: **|** I lost, so here is `+' + winnings + '` hentai coins!');
                this.bot.r.table('users').get(msg.author.id).update({
                    ecomony: {
                        coins: winnings
                    }
                }).run();
                return;
            } else if (res === 'scissors') {
                msg.channel.createMessage(":tada: **|** I won! Since I am nice, you can keep your hentai coins.");
                return;
            } else if (res === 'paper') {
                msg.channel.createMessage(':thinking: **|** A tie...');
                return;
            }
        } else if (choice === 'scissors') {
            if (res === 'paper') {
                let winningChance = (Math.random() * 0.95) + 1;
                const winnings = Math.round(uConfig.ecomony.coins * winningChance);
                msg.channel.createMessage(':thinking: **|** I lost, so here is `+' + winnings + '` hentai coins!');
                this.bot.r.table('users').get(msg.author.id).update({
                    ecomony: {
                        coins: winnings
                    }
                }).run();
                return;
            } else if (res === 'rock') {
                msg.channel.createMessage(":tada: **|** I won! Since I am nice, you can keep your hentai coins.");
                return;
            } else if (res === 'scisorrs') {
                msg.channel.createMessage(':thinking: **|** A tie...');
                return;
            }
        } else {
            msg.channel.createMessage(":x: **|** Wrong choices!");
        }
        msg.channel.createMessage(":x: **|** I won by default!~ Cheater! You loose 20 hentai coins...");
        let owo = Math.max(0, uConfig.ecomony.coins - 20);
        this.bot.r.table('users').get(msg.author.id).update({
            economy: {
                coins: owo
            }
        }).run();
    }
}

module.exports = RockPaperScissorsCommand;