var express = require('express')
  , router = express.Router()

router.use('/users', require('./users.js'))
router.use('/events', require('./events.js'))

module.exports = router;
