const config = require('../config.json');
const r = require('rethinkdbdash')(config.rethinkdb);

module.exports = r;