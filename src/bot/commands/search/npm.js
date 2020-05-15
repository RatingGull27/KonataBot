const Command = require('../../structures/BaseCommand');

class NPMCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'npm',
            desc: 'Searches the npm registry for a package.',
            usage: 'npm [package]',
            aliases: [
                'npm-registry',
                'npm-package'
            ],
            examples: [
                'konata npm animu.js',
                'k;npm-package hentai.js'
            ],
            category: 'Search'
        });
    }

    async execute(msg, args) {
        if (!args[0]) return msg.channel.createMessage(`:mag: **|** I can't search a NPM package if there isn't a result.`);

        const m = await msg.channel.createMessage(`:mag: **|** Fetching \`${args.join(" ")}\` npm package...`);

        const pkg = encodeURIComponent(args[0].replace(/ /g, '-'));
        const { body } = await this.bot.snek.get(`https://registry.npmjs.com/${pkg}`);
        if (body.time.unpublished) return m.edit(`<:KonataYawn:710895044831477774> **|** \`${pkg}\` is unpublished.`);
        const version = body.versions[body['dist-tags'].latest];
        const maintainers = this.bot.utils.trimArray(body.maintainers.map(u => u.name));
        const dependencies = version.dependencies ? this.bot.utils.trimArray(Object.keys(version.dependencies)) : null;
        await m.delete();
        msg.channel.createMessage({ embed: {
            title: "Konata Izumi » NPM Package",
            description: `__**Package ${body.name}**__\n${body.description || 'None'}`,
            fields: [{
                name: "» Version",
                value: body['dist-tags'].latest,
                inline: true
            },
            {
                name: "» License",
                value: body.license || 'No license.',
                inline: true
            },
            {
                name: "» Author",
                value: body.author ? body.author.name : '???',
                inline: true
            },
            {
                name: "» Creation Date",
                value: new Date(body.time.created).toDateString(),
                inline: true
            },
            {
                name: "» Modified at",
                value: new Date(body.time.modified).toDateString(),
                inline: true
            },
            {
                name: "» Main File",
                value: version.main || 'index.js',
                inline: true
            },
            {
                name: "» Dependencies",
                value: dependencies && dependencies.length ? `\`${dependencies.join('`, `')}\`` : 'None',
                inline: true
            },
            {
                name: "» Maintainers",
                value: `\`${maintainers.join('`, `')}\``,
                inline: true
            }],
            color: this.bot.utils.color
        }});
    }
}

module.exports = NPMCommand;