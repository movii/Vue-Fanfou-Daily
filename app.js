const express = require('express')
const path = require('path')
const history = require('connect-history-api-fallback');
const createCorntab = require('./corntab')
const router = require('./router')

const app = express()

app.use(history({ index: '/' }))
app.use(router)
app.use('/static', express.static(path.join(__dirname, 'public')))

// create Cornttab
createCorntab()

// always send back index.html 
app.get('/', (req, res) => res.status(200).sendFile(path.resolve(__dirname, 'public/index.html')));
app.listen(3000, () => console.log('app listening on port 3000!'));
