const Command = require('../../structures/BaseCommand');

class nsfwCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'nsfw',
            desc: 'nsfw',
            usage: 'nsfw',
        });
    }

    async execute(msg, args) {
        return msg.channel.createMessage({ embed: {
            title: "__**nsfw_command_list Konata Izumi**__",
            description: "\n\n__**nsfw**__\n\*anal\n\t*bj\n\t*blowjob\n\t*boobs\n\t*cum_jpg\n\t*cum\n\t*ero\n\t*erofeet\n\*erok\n\t*erokemo\n\t*eron\n\t*eroyuri\n\t*feet\n\t*feetg\n\t*femdom\n\t*futanari\n\t*gasm\n\t*hentai\n\t*holoero\n\t*hololewd\n\t*keta\n\t*les\n\t*lewd\n\t*lewddk\n\t*lewdkemo\n\t*nsfw_avatar\n\t*nsfw_neko_gif\n\t*pussy_jpg\n\t*pussy\n\t*pwankg\n\t*Random_hentai_gif\n\t*smallboobs\n\t*solo\n\t*solog\n\t*spank\n\t*tits\n\t*trap\n\t*yuri",
            footer: {
                text: "HAHAHA! No NSFW tag! is a meme | Konata Izumi » Your weeb helper!"
            },
            color: this.bot.utils.color
        }});
    }
}

module.exports = nsfwCommand;
