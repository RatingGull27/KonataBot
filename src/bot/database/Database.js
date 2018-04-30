const r = require('rethinkdbdash')({
    db: 'KonataBot',
    host: 'localhost',
    port: 28015
});

module.exports = r;