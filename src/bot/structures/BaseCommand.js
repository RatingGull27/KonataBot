class BaseCommand {
    constructor(client, {
        name = null,
        desc = "No description?",
        usage = "No usage?",
        category = "Core",
        aliases = [],
        examples = [],
        guildOnly = false,
        ownerOnly = false,
        nsfwOnly = false,
        enabled = true
    }) {
        this.bot = client;
        this.options = { name, desc, usage, category, aliases, examples, guildOnly, ownerOnly, nsfwOnly, enabled };
    }

    async execute(msg, args) {}
}

module.exports = BaseCommand;