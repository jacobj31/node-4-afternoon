require('dotenv').config()
const express = require('express')
const session = require('express-session')
const checkForSession = require('./middlewares/checkForSession')
const CTRL = require('./controllers/swagController')
const authCTRL = require('./controllers/authController')
const cartCTRL = require('./controllers/cartController')
const searchCTRL = require('./controllers/searchController')

const app = express()
const{SESSION_SECRET, SERVER_PORT} = process.env

//Middleware
app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`))

//Endpoints
app.get('/api/swag', CTRL.read)

app.post('/api/login', authCTRL.login)
app.post('/api/register', authCTRL.register)
app.post('/api/signout', authCTRL.signout)
app.get('/api/user', authCTRL.getUser)

app.post('/api/cart/checkout', cartCTRL.checkout)
app.post('/api/cart/:id', cartCTRL.add)
app.delete('/api/cart/:id', cartCTRL.delete)

app.get('/api/search', searchCTRL.search)

app.listen(SERVER_PORT, () => console.log('Please enjoy port', SERVER_PORT))