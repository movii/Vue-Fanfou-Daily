const path = require('path')
const express = require('express')
const history = require('connect-history-api-fallback')
const createCornJob = require('./cronjob')
const app = express()

createCornJob()
app.use(history({
  index: '/'
}))
app.use('/dist', express.static(path.join(__dirname, 'dist')))

app.get('/', (req, res) => {
  let html = path.resolve(__dirname, 'dist/index.html')
  res.status(200).sendFile(html)
})

app.listen(3000, () => {
  console.log('server start at port 3000')
})
