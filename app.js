const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const authRoutes = require('./routes/auth')
const analyticsRoutes = require('./routes/analytics')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position')
const keys = require('./config/keys')
const app = express()

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('* MongoDB connected.'))
    .catch(error => console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)

/*const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())*/
app.use(require('morgan')('dev'))
app.use('/uploads', express.static('uploads'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(require('cors')())

app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)

module.exports = app