const r = require('express').Router();

r.get('api', (req, res) => {
    res.send(`Avaliable API Endpoints:\n\tapi/stats: Grabs Konata's realtime statistics.\n\tapi/konata: Sends a image of Konata.`);
});

r.get('api/stats', (req, res) => {

});

r.get('api/konata', (req, res) => {
    res.send('api/konata: Coming soon. (This sends a picture of Konata.)');
});