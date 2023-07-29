const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')

const routes = require('./routes/index')

const usePassport = require('./config/passport')

require('./config/mongoose')

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}



app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//express-session
app.use(session(
    {
        secret: 'ThisIsMySecret',
        resave: false,
        saveUninitialized: true
    }
))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)
app.use(flash())  // 掛載connect-flash套件

app.use((req, res, next) => {
    // 你可以在這裡 console.log(req.user) 等資訊來觀察
    res.locals.isAuthenticated = req.isAuthenticated()
    res.locals.user = req.user
    res.locals.success_msg = req.flash('success_msg')  // 設定 success_msg 訊息
    res.locals.warning_msg = req.flash('warning_msg')  // 設定 warning_msg 訊息
    next()
})

app.use(routes)


app.listen(port, () => {
    console.log(`Express is running on http://localhost:${port}`)
})