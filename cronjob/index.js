const job = require('./job')
const CronJob = require('cron').CronJob

function createCornJob () {
  new CronJob('0 */5 * * * *', () => job(), null, true, 'Asia/Shanghai')
}

module.exports = createCornJob