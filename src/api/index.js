import AV from '../../leancloud'
import Entries from '../models/entries'
import Status from '../models/status'

export function fetchEntries () {
  return new AV.Query(Entries).first().then(res => {
    return Promise.resolve(res.data)
  })
}

export function fetchDaily (day) {
  let query = new AV.Query(Status)

  query.equalTo('date', day)
  query.descending('createdAt')

  return query.find()
}

export function fetchStatus (statusid) {
  let query = new AV.Query('STATUSES')

  query.equalTo('statusid', statusid)
  query.limit(1)

  return query.find().then(statuses => statuses[0])
}
