const Event = require('../structures/BaseEvent');

class ReadyEvent extends Event {
    constructor(client) {
        super(client, {
            name: 'ready'
        });
    }

    execute() {
        this.bot.log.info('Konata Izumi has connected via Discord!');
        this.bot.rotater.rotate(this.bot);
        this.bot.webhook.createMessage({
            title: "Konata Izumi ;; Connected via Discord",
            description: "Hello! I connected via Discord, here are the statistics:",
            fields: [{
                name: "Statistics",
                value: `\`\`\`prolog\nGUILDS: ${this.bot.guilds.size}\nUSERS: ${this.bot.users.size}\nCHANNELS: ${Object.keys(this.bot.guildChannelMap)}\nSHARDS: ${this.bot.shards.id}/${this.bot.shards.count}\`\`\``
            }],
            color: this.bot.utils.color
        });
    }
}

module.exports = ReadyEvent;