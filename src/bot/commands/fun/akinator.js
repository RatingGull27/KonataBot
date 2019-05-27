const Command = require('../../structures/BaseCommand');

class AkinatorCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'akinator',
            desc: 'Play some akinator to get hentai coins!',
            usage: 'akinator [answer]',
            aliases: [
                'web-genie',
                'genie'
            ],
            examples: [
                '{prefix}akinator yes'
            ],
			category: 'Minigames'
        });

		this.games = new Map();
    }

    async execute(msg, args) {
		const { color } = this.bot.utils;
		const uConfig = await this.bot.r.table('users').get(msg.author.id).run();
        if (this.games.has(msg.channel.id)) return msg.channel.createMessage(':x: **|** Only one game per channel.');

        try {
            let ans = null;
            this.games.set(msg.channel.id, { progress: 0 });
            while (this.games.get(msg.channel.id).progress < 99) {
                const data = ans === null ? await this.createSession(msg.channel) : await this.progress(msg.channel, ans);
                if (!data || this.games.get(msg.channel.id).step >= 80) break;
                const answers = data.answers.map(a => a.answer.toLowerCase());
                answers.push('end');
                await msg.channel.createMessage({
                    content: `**${++data.step}.** ${data.question}`,
                    embed: {
                        color,
                        description: `${data.answers.map(a => a.answer).join(' | ')}`
                    }
                });
                const filter = res => res.author.id === msg.author.id && answers.includes(res.content.toLowerCase());
                const messages = await msg.channel.awaitMessages(filter, {
                    timeout: 30000
                });
                if (!messages) {
                    await msg.channel.createMessage(':x: **|** Times up!');
                    break;
                }
                if (messages.content.toLowerCase() === 'end') break;
                ans = answers.indexOf(messages.content.toLowerCase());
			}
			const guess = await this.finish(msg.channel);
			if (!guess) return msg.channel.createMessage(`:thinking: **|** Something has errored, try again later.`);
			msg.channel.createMessage({
				content: `:thinking: **|** I'm ${Math.round(guess.proba * 100)}% sure it is:`,
				embed: {
					color,
					description: `${guess.name}${guess.description ? `\n*${guess.description}*` : ''}`,
					thumbnail: {
						url: guess.absolute_picture_path
					}
				}
			});
			const verification = await this.verify(msg.channel, msg.author);
			if (verification === 0) {
				let owo = Math.max(0, uConfig.ecomony.coins - 10);
				this.bot.r.table('users').get(msg.author.id).update({
					economy: {
						coins: owo
					}
				}).run();
				msg.channel.createMessage(':moneybag: **|** Your silence made you loose 10 hentai coins!');
			}
			if (!verification) {
				let winningChance = (Math.random() * 0.95) + 1;
				const winnings = Math.round(uConfig.ecomony.coins * winningChance);
				this.bot.r.table('users').get(msg.author.id).update({
					ecomony: {
						coins: winnings
					}
				}).run();
				msg.channel.createMessage(":clap: **|** You have defeated me and won `" + winnings + "` hentai coins!");
			}
			msg.channel.createMessage('<:KonataOwO:582320118680518676> **|** Guessed right one more time! I love playing with you! Have some cake. :cake:');
        } catch(err) {
			this.games.delete(msg.channel.id);
			msg.channel.createMessage(`<:KonataCry:582307198957387795> **|** An error has occured! \`\`\`js\n${err.stack}\`\`\`. Try again later~`);
        }
	}
	
	async createSession(channel) {
		const { body } = await this.bot.snek.get('http://api-usa3.akinator.com/ws/new_session').query({
			partner: 1,
			player: 'konata',
			constraint: 'ETAT<>\'AV\''
		});
		const data = body.parameters;
		if (!data) return null;
		this.games.set(channel.id, {
			id: data.identification.session,
			signature: data.identification.signature,
			step: 0,
			progress: Number.parseInt(data.step_information.progression, 10)
		});
		return data.step_information;
	}

	async progress(channel, answer) {
		const session = await this.games.get(channel.id);
		const { body } = await this.bot.snek
			.get('http://api-usa3.akinator.com/ws/answer')
			.query({
				session: session.id,
				signature: session.signature,
				step: session.step,
				answer
			});
		const data = body.parameters;
		if (!data) return null;
		this.games.set(channel.id, {
			id: session.id,
			signature: session.signature,
			step: Number.parseInt(data.step, 10),
			progress: Number.parseInt(data.progression, 10)
		});
		return data;
	}

	async finish(channel) {
		const session = this.games.get(channel.id);
		const { body } = await this.bot.snek
			.get('http://api-usa3.akinator.com/ws/list')
			.query({
				session: session.id,
				signature: session.signature,
				step: session.step,
				size: 1,
				mode_question: 0
			});
		if (!body.parameters) return null;
		return body.parameters.elements[0].element;
	}

	async verify(channel, author, time = 30000) {
		const filter = res => {
			const value = res.content.toLowerCase();
			return res.author.id === author.id && (['yes', 'yus', 'y'].includes(value) || ['nu', 'no', 'nada', 'n'].includes(value));
		}
		const verify = await channel.awaitMessages(filter, {
			timeout: time
		});
		if (!verify || selected.content === 'c') return false;
		const choice = verify.first().content.toLowerCase();
		if (['no', 'nu', 'nada', 'n'].includes(choice)) return true;
		if (['yes', 'yus', 'y'].includes(choice)) return false;
		return false;
	}
}

module.exports = AkinatorCommand;