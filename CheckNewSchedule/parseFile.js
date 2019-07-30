const fs = require('fs');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');

const poolUrl = 'https://mzuk.gliwice.pl/jednostka/kryte-plywalnie/kryta-plywalnia-olimpijczyk/';

const checkNewSchedule = () => {
  console.log('Service CheckNewSchedule started');
  request(poolUrl, function (error, response, body) {
    const html = body;
    const $ = cheerio.load(html);
    const links = $('a[href*="niecka"]');

    $(links).each(function (i, link) {
      const remoteFile = $(link).attr('href');
      getFile(remoteFile);
    });
  });
}

const getFile = url => {
    console.log(`File ${url} download started.`);
    var fileName = path.basename(url);
    const file = fs.createWriteStream(fileName);
    request(url, (e, r, b) => {
      if (e) {
        console.log(e);
      }
      console.log(`File ${url} downloaded`);
      r.pipe(file);
    });
  };

module.exports = checkNewSchedule;