const KonataClient = require('./client/KonataClient');
const config = require('./config.json');

const client = new KonataClient(config.tokens.Dev, {
    maxShards: 'auto',
    disableEveryone: true,
    autoReconnect: true,
    defaultImageFont: 'png',
    getAllUsers: true
});

client.launch();

process.on('unhandledRejection', (err) => {
    client.gearbox.report(err);
    client.log.error(`\n${err.stack}`);
});