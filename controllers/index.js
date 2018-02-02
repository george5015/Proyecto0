var express = require('express')
  , router = express.Router()

router.use('/users', require('./users'))
router.use('/events', require('./events'))

router.get('/', function(req, res) {
  res.sendFile(__dirname + './views' + '/index.html')
})

module.exports = router
