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


app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


app.use(flash())

app.get('/', (req, res) => {
    res.render('index','')
}
)

app.listen(port, () => {
    console.log(`Express is running on http://localhost:${port}`)
  })