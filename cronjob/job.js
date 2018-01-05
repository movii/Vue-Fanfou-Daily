const AV   = require('../leancloud')
const load = require('./load')

const ENTRIES = AV.Object.extend('ENTRIES')
const ENTRIES_QUERY = new AV.Query('ENTRIES')
const STATUS  = AV.Object.extend('STATUSES')

const URL_PERFIX  = 'http://blog.fanfou.com/digest/json/'
const ENTRIES_URL = URL_PERFIX + 'index.json'

let statusObjectToSave = []

function delay (t) {
  return new Promise(resolve => setTimeout(resolve, t))
}

// 抓取 http://blog.fanfou.com/digest/index.json 的 index 数据
function fetchRemoteUrls () {
  return load(ENTRIES_URL)
    .then(data => JSON.parse(data))
    .then(entries => entries.map(entry =>  entry.replace(/^\.\/json\//ig, '')))
    .then(entries => entries.filter(e => e.includes('daily')))
    .catch(err => console.log(err))
}

// 取得 LeanCloud 存入的 index 数据
function fetchLocalUrls () {
  return new Promise((resolve, reject) => {
    ENTRIES_QUERY.find()
      .then(results => resolve(results[0].get('data')))
      .catch(err => reject(err))
  })
}

// 抓取每日信息 - 1
// 如果有没有入库的精选日期，则循环抓取其数据
function fetchDailys (urls) {
  return urls.reduceRight((promise, url) => {
    return promise.then(() => {
      return delay(1 * 1000).then(() => fetch_daily(url))
    }).catch(err => console.log(err))
  }, Promise.resolve())
}

// 抓取每日信息 - 2. 包含在上一步之中的方法
// 对每一天的进行内容进行处理
function fetch_daily (url) {
  return load(URL_PERFIX + url)
    .then(raw_entry => processDailys(raw_entry))
    .then(() => {
      console.log(`Current objects\' length:  ${statusObjectToSave.length}`)
      return Promise.resolve()
    })
    .catch(err => {
      console.log(err)
    })
}

// 抓取每日信息 - 3. 包含在上一步之中
// 将每日精选数据存入 LeanCloud 中
// 比如 2017-10-16.daily.json 中，就是这一天精选的数据
// 其中一般包含 20 条消息及其 meta 信息，
function processDailys (raw_daily) {
  let daily = JSON.parse(raw_daily)
  let msgs  = daily.msgs
  let meta  = { date: daily.date, shift: daily.shift, shift_cn: daily.shift_cn }
  console.log(`Processing ${daily.date}`)

  // 如果没有 msg 对象
  if (!msgs) {
    console.log('没有 msg 对象')
    return Promise.resolve()
  }

  // 如果 msgs 对象中没有数据
  // 跑数据的时候发现 2016-07-20 和 2016-07-21 中没有数据
  if (!msgs.length) {
    console.log('没有 msg 数据')
    return Promise.resolve()
  }

  return msgs.reduceRight((promise, status) => {
    return promise.then(() => {

      let s    = new STATUS()
      let item = Object.assign(meta, status)

      Object.keys(item).forEach(key => {
        s.set(key, item[key])
      })

      statusObjectToSave.push(s)
      return Promise.resolve()
    })
      .catch( err => {
        console.log(err)
      })
  }, Promise.resolve())
}

function updateEntries (remoteUrls) {
  return new Promise((resolve, reject) => {
    let ENTRIES_QUERY = new AV.Query('ENTRIES')
    ENTRIES_QUERY.find()
      .then(results => {
        let obj = results[0]
        obj.set('data', remoteUrls)
        obj.save()
          .then(res => console.log('entries 更新成功'))
          .catch(err => console.log(err))
      })
  })
}

// 使用 LeacCloud 数据存储 API 的内容
function saveAll () {
  return AV.Object
    .saveAll(statusObjectToSave)
    .then(results => {
      console.log(`results' length is: ${results.length}`)
    })
    .catch(err => console.log(err))
}

function job () {
  Promise.all([
    fetchRemoteUrls(),
    fetchLocalUrls()
  ])
    .then(([
      remoteUrls,
      localUrls
    ]) => {
    // 对比官方网站和 LeanCloud 保存的 index 数据
    // 判断有无未保存内容
      if (remoteUrls.length === localUrls.length) {
        console.log('Nothing new!')
      }
      else {
        let diff = remoteUrls.filter(url => {
          return !localUrls.includes(url)
        })

        fetchDailys(diff).then(() => {
          return saveAll().then(() => {
            return updateEntries(remoteUrls)
          })
        })
      }
    })
}

module.exports = job