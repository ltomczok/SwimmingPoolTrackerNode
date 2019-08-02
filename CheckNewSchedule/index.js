const parser = require('./parseFile');
const poolUrl = 'https://mzuk.gliwice.pl/jednostka/kryte-plywalnie/kryta-plywalnia-olimpijczyk/';

console.log('Service CheckNewSchedule started');
parser()
  .then(response => {
    console.log('Service CheckNewSchedule stoped');
  });