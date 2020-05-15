const Command = require('../../structures/BaseCommand');

class InviteMeCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'inviteme',
            desc: 'Invite me to your server or join my discord server!',
            usage: 'inviteme',
            aliases: ['invite'],
            examples: ['konata inviteme']
        });
    }

    async execute(msg, args) {
        return msg.channel.createMessage({ embed: {
            title: "Konata Izumi » Links",
            description: "Oh, you're gonna invite me?! >w<",
            fields: [{
                'name': '» Bot',
                'value': 'https://discordapp.com/oauth2/authorize?&client_id=466008883949994004&scope=bot&permissions=1651900225'
            },
            {
                name: '» Discord',
                value: 'https://discord.gg/buunN3V'
            }],
            color: this.bot.utils.color
        }});
    }
}

module.exports = InviteMeCommand;