const Command = require('../../structures/BaseCommand');

class TestCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'test',
            desc: "A test command!",
            usage: 'test [...args]',
            examples: ['test me'],
            aliases: ['debug']
        });
    }

    async execute(msg, args) {
        return msg.channel.createMessage('<:KonataOwO:438519335556874240> **|** I\'m online!');
    }
}

module.exports = TestCommand;