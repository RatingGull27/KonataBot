// Randomize a file. (Credits to Derpy :^)
// Slightly modified (https://github.com/jfix/npm-random-file); Derpy gave me the code >~<
const path = require('path');
const fs = require('fs');

module.exports = function (dir, callback) {
  fs.readdir(dir, (err, files) => {
    if (err) return callback(err);
    function checkRandom () {
      const randomIndex = Math.floor(Math.random() * files.length);
      const file = files[randomIndex];
      fs.stat(path.join(dir, file), (err, stats) => {
        if (err) return callback(err);
        if (stats.isFile()) {
          return callback(null, file);
        }
        files.splice(randomIndex, 1);
        checkRandom();
      });
    }
    checkRandom();
  });
}