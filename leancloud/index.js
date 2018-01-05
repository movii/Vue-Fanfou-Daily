const AV = require('leancloud-storage')
const APP_ID = ''
const APP_KEY = ''

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

module.exports = AV