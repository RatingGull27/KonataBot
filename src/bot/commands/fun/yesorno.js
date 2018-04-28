const Command = require('../../structures/BaseCommand');

class YesOrNoCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'yesorno',
            desc: 'Generates an answer as an "yes" or "no".',
            usage: 'yesorno [...question]',
            aliases: ['yusornu', 'yes-or-no'],
            examples: ['k;yusornu'],
            category: 'Fun'
        });
    }

    async execute(msg, args) {
        if (!args[0]) return msg.channel.createMessage(`:mega: **|** Invalid usage, execute this: \`${this.bot.config.prefix}help yesorno\`.`);
        const m = await msg.channel.createMessage(`:mega: **|** Generating answer...`);

        const { body } = await this.bot.snek.get('https://yesno.wtf/api/');

        await m.delete();
        msg.channel.createMessage({ embed: {
            title: "Konata Izumi » Yes or No!",
            desciption: `The answer to \`${args.join(" ")}\` is: \`${body.answer.toString()}\`!`,
            image: {
                url: `${body.image}`
            },
            color: this.bot.utils.color
        }});
    }
}

module.exports = YesOrNoCommand;