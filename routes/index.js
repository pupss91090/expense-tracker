const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const record = require('./modules/record')
const users = require('./modules/users')

const { authenticator } = require('../middleware/auth')  // 掛載 middleware

router.use('/users', users)
router.use('/record',authenticator, record)
router.use('/',authenticator, home)

module.exports = router