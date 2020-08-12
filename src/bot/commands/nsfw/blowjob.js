const Command = require('../../structures/BaseCommand');

const data = require("../../lib/image/nsfw/blowjobs");

class blowjobCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'blowjob',
            desc: 'blowjob a user!',
            category: 'nsfw',
            nsfwOnly: true,
            examples: [
                '{prefix}blowjob',
            ],
            cooldown: 5
        });
    }

    async execute(msg, args) {
        msg.channel.createMessage(data[Math.floor(Math.random() * data.length)]);
    }
}

module.exports = blowjobCommand;