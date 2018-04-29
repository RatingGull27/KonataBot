global.Promise = require('bluebird');

const Util = require('../../utils/Util');
const Eris = Util.initEris(require('eris')).Client;
const Logger = require('sj.reggol');
const { MeguminClient } = require('megumin.js');
const { CFClient } = require('animu.js');
const { DadJokeClient } = require('dadjoke.js');
const KitsuClient = require('kitsu');
const { Api } = require('node-osu');
const Gearbox = require('../modules/Gearbox');
const fs = require('fs');
const WebhookClient = require('../../utils/webhook/WebhookClient');

class KonataClient extends Eris {
    constructor(token, options = {}) {
        super(token, options);

        this.commands = [];
        this.aliases = [];
        this.config = require('../config.json');
        this.animu = new CFClient('Konata Izumi/' + require('../../../package.json').version + '/Production');
        this.megumin = new MeguminClient('Konata Izumi/' + require('../../../package.json').version + '/Production');
        this.dadjoke = new DadJokeClient('Konata Izumi/' + require('../../../package.json').version + '/Production');
        this.log = new Logger({
            useTimestamp: true
        });
        this.gearbox = new Gearbox(this);
        this.osu = new Api(this.config.tokens.osu, {
            notFoundAsError: false,
            completeScores: true
        });
        this.kitsu = new KitsuClient();
        this.webhook = new WebhookClient(this.config.webhook_dev.id, this.config.webhook_dev.token);
        this.db = require('../database/DatabaseUtil');
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
                files.forEach(_ => {
                    try {
                        const Command = require(`../commands/${categories[i]}/${_}`);
                        const cmd = new Command(this);
    
                        if (!cmd.options.aliases || !cmd.options.enabled) return;
    
                        this.commands.push(cmd);
                        this.aliases.forEach(__ => this.aliases.push(__));
                        this.log.info(`Loaded "${cmd.options.name}"!`);
                    } catch(e) {
                        this.log.error(`Command "${_.replace('.js', '')}": ${e.stack}`);
                    }
                });
            });
        }

        fs.readdir('./events', (err, files) => {
            if (err) this.log.error(`${err.stack}`);
            this.log.info(`Loading "${files.length}" events...`);
            files.forEach(_ => {
                const Event = require(`../events/${_}`);
                const __ = new Event(this);

                const wrapper = async(...args) => {
                    try {
                        await __.execute(...args);
                    } catch(err) {
                        this.log.error(err.stack);
                    }
                }

                this.on(__.uwu.name, wrapper);
            });
        });
    }

    async reboot() {
        this.log.info('Konata is being reconnected...');
        await this.disconnect({
            reconnect: false
        });
        await this.launch();
    }
}

module.exports = KonataClient;