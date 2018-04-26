global.Promise = require('bluebird');

const Util = require('../../utils/Util');
const Eris = Util.initEris(require('eris')).Client;
const Logger = require('sj.reggol');
const MeguminClient = require('megumin.js');
const AnimuClient = require('animu.js');
const DadJokeClient = require('dadjoke.js');
const KitsuClient = require('kitsu');
const { Api } = require('node-osu');
const Gearbox = require('../modules/Gearbox');
const GameRotater = require('../modules/GameRotater');
const fs = require('fs');

class KonataClient extends Eris {
    constructor(token, options = {}) {
        super(token, options);

        this.commands = [];
        this.aliases = [];
        this.config = require('../config.json');
        this.animu = new AnimuClient('Konata Izumi/' + require('../../../package.json').version + '/Production');
        this.megumin = new MeguminClient();
        this.dadjoke = new DadJokeClient();
        this.log = new Logger({
            useTimestamp: true
        });
        this.gearbox = new Gearbox(this);
        this.rotater = GameRotater;
        /*this.osu = new Api(this.config.tokens.osu, {
            notFoundAsError: false,
            completeScores: true
        });*/
        this.kitsu = new KitsuClient();
        this.webhook = new (require('../../util/webhook/WebhookClient'))(this, this.config.webhooks.id, this.config.wehooks.token);
        this.db = require('../database/DatabaseUtil');
        this.r = require('../database/Database');
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
}

module.exports = KonataClient;