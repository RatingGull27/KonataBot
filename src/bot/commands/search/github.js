const Command = require('../../structures/BaseCommand');

class GithubCommand extends Command {
    constructor(bot) {
        super(bot, {
            name: 'github',
            desc: 'Searches a github repository with it\'s commits.',
            usage: 'github [user/org] [repo_name]',
            aliases: ['repository', 'repo'],
            examples: ['konata repo KonataBot KonataBot', 'k;github MantaroBot Mantaro'],
            category: 'Search'
        });
    }

    async execute(msg, args) {
        if (!args[0]) return msg.channel.createMessage(`<:KonataYawn:438856268338298881> **|** Invalid usage, do \`${this.bot.config.prefix}help github\`.`);
        const m = await msg.channel.createMessage(`<:KonataOk:438856307580338176> **|** Fetching \`${args[0]}/${args[1]}\`.`);

        const repo = await this.bot.snek.get(`https://api.github.com/repos/${args[0]}/${args[1]}`); // Gets the repository
        const commits = await this.bot.snek.get(`https://api.github.com/repos/${args[0]}/${args[1]}/commits`); // Gets the lastest commits.

        m.delete();
        msg.channel.createMessage({ embed: {
            title: `Konata Izumi » Github Repository (ID: ${repo.body.id})`,
            description: `**Latest Commits**:\n${commits.body.slice(0, 3).map((c) => `[\`${c.sha.substr(0, 7)}\`](${c.commit.url}) - **${c.commit.message}**`).join("\n")}`,
            fields: [{
                name: '» Description',
                value: `**${repo.body.description ? this.bot.utils.shorten(repo.body.description, 2000) : "No description."}**`
            },
            {
                name: "» Issues",
                value: repo.body.open_issues,
                inline: true
            },
            {
                name: "» Stars",
                value: `:star: ${repo.body.stargazers_count}`,
                inline: true
            },
            {
                name: "» Forks",
                value: `:spoon: ${repo.body.forks}`,
                inline: true
            },
            {
                name: "» Created at",
                value: new Date(repo.body.created_at).toDateString(),
                inline: true
            },
            {
                name: "» Modified at",
                value: new Date(repo.body.updated_at).toDateString(),
                inline: true
            },
            {
                name: "» People who are watching",
                value: `:eyes: ${repo.body.watchers_count}`,
                inline: true
            },
            {
                name: "» Primary Language",
                value: repo.body.language || '???',
                inline: true
            }],
            color: this.bot.utils.color
        }});
    }
}

module.exports = GithubCommand;