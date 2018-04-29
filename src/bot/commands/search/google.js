/*
const cheerio = require('cheerio');
const snekfetch = require('snekfetch');
const querystring = require('querystring');

async function googleCommand(msg) {
    const searchContent = args2.join(" ");

   let searchMessage = await message.reply('Searching...');
   let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchContent)}`;

  const nsfwWords = [
    "blowjob",
    "penis",
    "tits",
    "dick",
    "boobs",
    "boobz",
    "porn",
    "hentai",
    "titties",
    "big penises",
    "nsfw",
    "NSFW",
    "hot women",
    "hot chicks",
    "blowie",
    "sUcC",
    "vagina",
    "pussy",
    "sex",
    "mee6",
    "cum",
    "semen",
    "sEmEn",
    "murder",
    "gore",
    "split open head",
    "dead animal",
    "dead bunny",
    "kys",
    "@everyone",
    "@here",
    "@someone",
    "hanime.tv",
    "fakku",
    "loli",
    "変態",
    "animephile"
];

if (nsfwWords.some(word => message.content.includes(word))) {
    searchMessage.delete()
      .then(() => {
        return console.log(`${message.guild.name}\n${message.author.tag}`)
    })
  }
  
   return snekfetch.get(searchUrl).then((result) => {

      let $ = cheerio.load(result.text);

      let googleData = $('.r').first().find('a').first().attr('href');

      googleData = querystring.parse(googleData.replace('/url?', ''));
      searchMessage.edit(`**A result was found!**\n${googleData.q}`);

  }).catch((err) => {
     searchMessage.edit(`No results for ${searchContent}.`);
  });
}*/