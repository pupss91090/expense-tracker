const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const record = require('./modules/record')
const users = require('./modules/users')

router.use('/users', users)
router.use('/record', record)
router.use('/', home)

module.exports = router