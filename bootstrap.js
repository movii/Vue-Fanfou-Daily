var AV = require('leancloud-storage');
var LEANCLOUD_API = require('./config/api.config');

AV.init(
  LEANCLOUD_API.appId, 
  LEANCLOUD_API.appKey 
);

module.exports = AV;

