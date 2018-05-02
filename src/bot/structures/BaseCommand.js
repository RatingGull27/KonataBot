class BaseCommand {
    constructor(bot, {
        name = null,
        desc = "No description?",
        usage = "No usage?",
        category = "Core",
        aliases = [],
        examples = [],
        guildOnly = false,
        ownerOnly = false,
        nsfwOnly = false,
        enabled = true,
        cooldown = 0
    }) {
        this.bot = bot;
        this.options = { name, desc, usage, category, aliases, examples, guildOnly, ownerOnly, nsfwOnly, enabled, cooldown };
    }

    async execute(msg, args) {}
}

module.exports = BaseCommand;