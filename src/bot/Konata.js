const KonataClient = require('./client/KonataClient');
const config = require('./config.json');

const client = new KonataClient(config.token, {
    maxShards: 'auto',
    disableEveryone: true,
    autoReconnect: true,
    defaultImageFormat: 'png',
    getAllUsers: true
});

client.launch();

process.on('unhandledRejection', (err) => {
    client.gearbox.report(err);
    client.log.error(`\n${err.stack}`);
});