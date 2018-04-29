const Command = require('../../structures/BaseCommand');

class MusicCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'music',
            desc: 'Shows what the music commands are.',
            usage: 'music',
            aliases: ['musica'],
            examples: ['konata music']
        });
    }

    async execute(msg, args) {
        return msg.channel.createMessage({ embed: {
            title: "Konata Izumi » Music Commands",
            description: `\`\`\`ini\n[ Music Commands ]\nThese are Konata's music commands, Music commands were made in Python mixed with JS.\n${this.bot.config.prefix}now :: Displays the current song\n${this.bot.config.prefix}queue [page=1] :: Displays the queue.\n${this.bot.config.prefix}pause :: Pauses the song.\n${this.bot.config.prefix}skip :: Skips the current song.\n${this.bot.config.prefix}volume [vol] :: Changes the volume.\n${this.bot.config.prefix}play [song] :: Plays a song.\n${this.bot.config.prefix}shuffle :: Shuffles the queue.\n${this.bot.config.prefix}repeat :: Enables or Disables looping the queue.\n${this.bot.config.prefix}remove <index> :: Removes a song.\n${this.bot.config.prefix}find :: Finds a song.\n${this.bot.config.prefix}disconnect :: Disconnects me from the Voice Channel.\n${this.bot.config.prefix}seek [time=sec] :: Seek to a part of the song.\n${this.bot.config.prefix}stop :: Stops the current queue.\n\n[ NOTE ]\nYou can't do ${this.bot.config.prefix}help play since it's another instance.\`\`\``,
            color: this.bot.utils.color
        }});
    }
}

module.exports = MusicCommand;