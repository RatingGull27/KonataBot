global.Promise = require('bluebird');

const Util = require('../../utils/Util');
const Eris = Util.initEris(require('eris')).Client;
const Logger = require('sj.reggol');
const { DadJokeClient } = require('dadjoke.js');
const KitsuClient = require('kitsu');
const Gearbox = require('../modules/Gearbox');
const fs = require('fs');
const WebhookClient = require('../../utils/webhook/WebhookClient');

class KonataClient extends Eris {
    constructor(token, options = {}) {
        super(token, options);

        this.commands = [];
        this.aliases = [];
        this.config = require('../config.json');
        this.dadjoke = new DadJokeClient('Konata Izumi/' + require('../../../package.json').version + '/Production');
        this.log = new Logger({
            useTimestamp: true
        });
        this.gearbox = new Gearbox(this);
        this.kitsu = new KitsuClient();
        this.webhook = new WebhookClient(this.config.webhook_dev.id, this.config.webhook_dev.token);
        this.r = require('../database/Database');
        this.utils = require('../../utils/Util');
        this.snek = require('snekfetch');
        this.messages = 0;
        this.commandsExecuted = 0;
        this.version = require('../../../package.json').version;
    }

    async launch() {
        await this.load();
        this.connect().then(() => this.log.custom('WebSocket', 'Konata Izumi is being connected via Discord..'));
    }

    async load() {
        const categories= await fs.readdirSync('./commands');

        for (let i = 0; i < categories.length; i++) {
            fs.readdir(`./commands/${categories[i]}`, (err, files) => {
                if (err) this.log.error(`\n${err.stack}`);
                this.log.info(`Loading "${files.length}" commands from category "${categories[i]}"`);
                files.forEach(f => {
                    try {
                        const Command = require(`../commands/${categories[i]}/${f}`);
                        const cmd = new Command(this);
    
                        if (!cmd.options.aliases || !cmd.options.enabled) return;
    
                        this.commands.push(cmd);
                        this.aliases.forEach(a => this.aliases.push(a));
                        this.log.info(`Loaded "${cmd.options.name}"!`);
                    } catch(e) {
                        this.log.error(`Command "${f.replace('.js', '')}": ${e.stack}`);
                    }
                });
            });
        }

        fs.readdir('./events', (err, files) => {
            if (err) this.log.error(`${err.stack}`);
            this.log.info(`Loading "${files.length}" events...`);
            files.forEach(f => {
                const Event = require(`../events/${f}`);
                const e = new Event(this);

                const wrapper = async(...args) => {
                    try {
                        await e.execute(...args);
                    } catch(err) {
                        this.log.error(err.stack);
                    }
                }

                this.on(e.uwu.name, wrapper);
            });
        });
    }

    async reboot() {
        this.log.info('Konata is being reconnected...');
        await this.disconnect({
            reconnect: false
        });
        this.utils.sleep(60000); // Sleeps for 60 seconds
        await this.launch();
    }
}

module.exports = KonataClient;