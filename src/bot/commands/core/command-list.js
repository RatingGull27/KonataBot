const Command = require('../../structures/BaseCommand');

class CommandlistCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'Commandlist',
            desc: 'Command_ist',
            usage: 'Commandlist',
            aliases: ['izumi-chan'],
            examples: ['k;izumi-chan', '!k.konata']
        });
    }

    async execute(msg, args) {
        return msg.channel.createMessage({ embed: {
            title: "__**Command_list Konata Izumi**__",
            description: "\n\n__**Action**__\n\*cuddle\n\t*feed\n\t*hug\n\t*kiss\n\t*pat\n\t*poke\n\t*tickle\n\n__**Animals**__\n\*brib\n\t*cat\n\t*dog\n\t*duck\n\t*lion\n\t*lizard\n\t*panda\n\t*penguin\n\t*red-panda\n\t*tiger\n\n__**core**__\n\*about\n\t*Commandlist\n\t*help\n\t*inviteme\n\t*ping\n\t*shardinfo\n\t*statistics\n\t*uptime\n\n__**fun**__\n\*ascii\n\t*dadjoke\n\t*fml\n\t*neko\n\t*yesorno\n\n__**Nsfw**__\n\*nsfw\n\n__**Search**__\n\*github\n\t*mdn\n\t*npm\n\t*reddit\n\n__**text-edit**__\n\*clapify\n\t*cringify\n\t*eyeify\n\t*owoify\n\t*say\n\n__**util**__\n\*choose\n\t*color\n\t*hex-to-int\n\t*make-guild-invite\n\n__**weebs**__\n\*anime\n\t*animu-picture\n\t*manga\n\t*megumin",
            footer: {
                text: "void#0038 is a meme | Konata Izumi » Your weeb helper!"
            },
            color: this.bot.utils.color
        }});
    }
}

module.exports = CommandlistCommand;
