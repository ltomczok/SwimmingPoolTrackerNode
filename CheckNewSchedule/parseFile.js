const downloadHelper = require('./downloadHelper');
const path = require('path');
const cheerio = require('cheerio');

const poolUrl = 'https://mzuk.gliwice.pl/jednostka/kryte-plywalnie/kryta-plywalnia-olimpijczyk/';

const checkNewSchedule = async () => {
  const html = await downloadHelper.getText(poolUrl);
  const $ = cheerio.load(html);
  const links = $('a[href*="niecka"]');

  $(links).each(async function (i, link) {
    const remoteFile = $(link).attr('href');
    await downloadHelper.getFile(remoteFile);
  });
}
module.exports = checkNewSchedule;