require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const worksheetsRouter = require('./worksheets/worksheets-route')
const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/users-route')
const classesRouter = require('./classes/classes-route')
const config = require('./config')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))

app.get(('/'), (req, res) => {
  res.send('Hello, world!')
})

app.use('/api/classes', classesRouter)
app.use('/api/worksheets', worksheetsRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)

// app.use(function errorHandler(error, req, res, next) {
//   let response
//   if (NODE_ENV === 'production') {
//     response = {message: 'Server error'}
//   } else {
//     console.log(error)
//     response = {message: error.message. error}
//   }
//   res.status(500).json(response)
// })

module.exports = app