const SAVE_TO_LEANCLOUD = require('./job');
const CronJob = require('cron').CronJob;

function createCornJob () {
  return new CronJob('00 15,30,50 * * * *', function () { SAVE_TO_LEANCLOUD(); }, null, true, 'Asia/Shanghai');
}

module.exports = createCornJob
