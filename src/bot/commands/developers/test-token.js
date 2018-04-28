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
            return msg.channel.createMessage(`<:KonataCry:438856292178591745> **|** You must enter a token before doing this command!`);
        }

        const ctx = await msg.channel.createMessage(`<:KonataOk:438856307580338176> **|** Testing token...`);
        const client = new Eris(args[0]);
        client.on('ready', () => {
            ctx.edit(`<:KonataOwO:438519335556874240> **|** Logged in as \`${client.user.username}\` with **${client.guilds.size}**`);
            client.disconnect({
                reconnect: false
            });
        });
        client.on('disconnect', () => ctx.edit(`<:KonataCry:438856292178591745> **|** Client got disconnected, maybe it's invalid?`));
        client.connect();
    }
}

module.exports = TestTokenCommand;