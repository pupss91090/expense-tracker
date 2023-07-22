const express = require('express')
const app = express()
const port = 3000

const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }

app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


app.use(flash())

app.get('/', (req, res) => {
    res.render('index','')
})

app.get('/new', (req, res) => {
    res.render('new','')
})

app.post('/new', (req, res) => {
    console.log('request:', req.body)   
})

app.listen(port, () => {
    console.log(`Express is running on http://localhost:${port}`)
  })