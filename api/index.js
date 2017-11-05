const AV = require('../bootstrap')

let ENTRIES = AV.Object.extend('ENTRIES')
let query   = new AV.Query('ENTRIES')

function fetchIndex() {
  return query.get('').then(d => Promise.resolve(d.get('entries')))
}

function fetchEntry (id) {
  return new AV.Query('ENTRY').get(id).then(d => Promise.resolve(d.get('entry')))
}

module.exports = {
  fetchIndex: fetchIndex,
  fetchEntry: fetchEntry
}