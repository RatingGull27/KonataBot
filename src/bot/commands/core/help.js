const Command = require('../../structures/BaseCommand');
const HandleDatabaseError = require('../../structures/HandleDatabaseError');

class HelpCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'help',
            desc: 'Gives the user a full list of commands or gives extended help.',
            usage: 'help [command | alias]',
            aliases: ['commands', 'command', 'cmds', 'halp', 'h', '?'],
            examples: ['help help', 'help']
        });
    }

    async execute(msg, args) {
        this.bot.r.table('guilds').get(msg.channel.guild.id).run((err, entry) => {
            if (err) HandleDatabaseError(this.bot, err, msg);
            let prefix = entry.prefix;

            if (!args[0]) {
                const categories = {};
    
                for (const cmd of this.bot.commands) {
                    if (cmd.options.ownerOnly && !this.bot.config.devs.includes(msg.author.id)) {
                        continue;
                    }
    
                    let category = categories[cmd.options.category];
    
                    if (!category) {
                        category = categories[cmd.options.category] = [];
                    }
    
                    category.push(cmd.options.name);
                }
    
                return msg.channel.createMessage({ embed: {
                    description: this.bot.utils.formatHelp(this.bot, prefix),
                    fields: Object.keys(categories).map(c => ({ name: `» ${c}`, value: `\`${categories[c].join("`, `")}\``, inline: true })),
                    footer: {
                        text: "snarkyllama#4331 is a meme! | Use " + prefix + "help [command] to get extended help! | Commands: " + Object.keys(this.bot.commands).length
                    },
                    color: this.bot.utils.color
                }});
            }

            const command = this.bot.commands.find(c => c.options.name.includes(args[0]) || c.options.aliases.includes(args[0]));
    
            try {
                return msg.channel.createMessage({ embed: {
                    title: `Konata Izumi » Command ${command.options.name.toString()}`,
                    description: `**Description**: ${command.options.desc}`,
                    fields: [{
                        name: "» Usage",
                        value: `\`${entry.prefix}${command.options.usage}\``,
                        inline: true
                    },
                    {
                        name: "» Aliases",
                        value: command.options.aliases ? `\`${command.options.aliases.join("`, `")}\`` : "No aliases found...",
                        inline: true
                    },
                    {
                        name: "» Examples",
                        value: command.options.examples ? `\`${command.options.examples.join("`, `").replace('{prefix}', prefix)}\`` : "No examples found...",
                        inline: true
                    },
                    {
                        name: "» Category",
                        value: command.options.category ? command.options.category.toString() : "Core",
                        inline: true
                    },
                    {
                        name: "» NSFW?",
                        value: command.options.nsfwOnly,
                        inline: true
                    },
                    {
                        name: "» Guild Only?",
                        value: command.options.guildOnly,
                        inline: true
                    },
                    {
                        name: "» Owner Only?",
                        value: command.options.ownerOnly,
                        inline: true
                    }],
                    footer: {
                        text: "Konata Izumi » Your weeb helper!"
                    },
                    color: this.bot.utils.color
                }});
            } catch(err) {
                return msg.channel.createMessage(`<:KonataCry:438856292178591745> **|** Command "${args[0]}" hasn't been found. :<`);
            }
        });
    }
}

module.exports = HelpCommand;