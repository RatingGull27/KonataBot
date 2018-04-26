const express = require('express');
const app = express();
const path = require('path');

/**
 * Connects to the website
 * 
 * @returns {void} The connection running.
 */
exports.connect = () => {
    app.listen(81, (err) => {
        if (err) console.log(`[WEBSITE]: Error:\n${err.stack}`);
        console.log(`[WEBSITE]: augu.me/Konata => Connected`);
    });
}

module.exports = (bot, r) => {

}