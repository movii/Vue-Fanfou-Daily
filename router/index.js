// const AV = require('../bootstrap')
const router = require('express').Router({ strict: true })
const API = require('../api')

router.get('/api/index', (req, res) => {
  API.fetchIndex().then(data => res.status(200).json(JSON.parse(data)))
})

router.get('/api/daily(/:id)?', (req, res) => {
  API.fetchEntry(req.params.id).then(data => res.status(200).json(JSON.parse(data)))
})

module.exports = router