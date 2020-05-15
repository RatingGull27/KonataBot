const Eris = require('eris').Client;
const Command = require('../../structures/BaseCommand');

class TestTokenCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'test-token',
            desc: 'Tests a token.',
            usage: 'test-token [...token]',
            aliases: ['discord', 'token'],
            category: 'Developers',
            ownerOnly: true
        });
    }

    async execute(msg, args) {
        if (!args[0]) {
            return msg.channel.createMessage(`<:KonataCry:582307198957387795> **|** You must enter a token before doing this command!`);
        }

        const ctx = await msg.channel.createMessage(`<:konataok:710895044902649996> **|** Testing token...`);
        const client = new Eris(args[0]);
        client.on('ready', () => {
            ctx.edit(`<:konataowo:710900227887857704> **|** Logged in as \`${client.user.username}\` with **${client.guilds.size}** guilds.`);
            client.disconnect({
                reconnect: false
            });
        });
        client.on('disconnect', () => ctx.edit(`<:KonataCry:582307198957387795> **|** Client got disconnected, maybe it's invalid?`));
        client.connect();
    }
}

module.exports = TestTokenCommand;