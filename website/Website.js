const express = require('express');
const path = require('path');
const app = express();
app.disable('x-powered-by');
const randomFile = require('./util/randomFile');

module.exports = (bot) => { // The website will start when the bot is ready.
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));
    app.use(express.static(path.join(__dirname, 'public')));

    app.use((req, res, next) => {
		res.locals.user = req.user;
		next();
    });

    app.get('/', (req, res) => { // Main Website
        res.render('index.ejs');
    });

    app.get('/api', (req, res) => { // API Documentation
        res.render('api.ejs');
    });

    app.get('/statistics', (req, res) => {
        res.render('statistics.ejs', {
            guilds: bot.guilds.size,
            users: bot.users.size,
            channels: Object.keys(bot.channelGuildMap).length,
            messages: bot.messages,
            commandsExecuted: bot.commandsExecuted,
            commands: Object.keys(bot.commands).length
        });
    });

    app.get('/api/statistics', (req, res) => { // API ;; To send the statistics.
        res.send(JSON.stringify({
            guilds: bot.guilds.size,
            users: bot.users.size,
            shards: bot.shards.size,
            channels: Object.keys(bot.channelGuildMap).length,
            commands: Object.keys(bot.commands).length
        }));
    });

    app.get('/invite', (req, res) => {
        res.redirect('https://discordapp.com/oauth2/authorize?&client_id=466008883949994004&scope=bot&permissions=1651900225');
    });

    app.get('/discord', (req, res) => {
        res.redirect('https://discord.gg/tw5D3Uu');
    });

    app.use((req, res) => {
        res.status(404).render('error.ejs', {
            code: 404,
            message: 'Resource or Page not found, redirecting back to website...'
        });
        res.redirect('/');
    });

    app.listen('8125', () => bot.log.custom('Website', `localhost:8125 => Listening..`));
}
