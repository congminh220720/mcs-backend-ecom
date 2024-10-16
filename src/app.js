const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
const app = express()
dotenv.config()

// init middlewares
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))


// init db
require('./dbs/init.mongodb')
// const { checkOverLoad } = require('./helpers/checkConnect')
// checkOverLoad()

// init routes
app.use('/', require('./routes/index'))
// handling error

app.use((req,res,next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error,req,res,next) => {
   const statusCode = error.status || 500
   return res.status(statusCode).json({
        status: 'Error',
        code: statusCode,
        message: error.message || 'Internal server error'
   })
})

module.exports = app