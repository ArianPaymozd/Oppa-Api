require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV, CLIENT_ORIGIN } = require('./config')
const worksheetsRouter = require('./worksheets/worksheets-route')
const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/users-route')
const classesRouter = require('./classes/classes-route')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())

app.use(cors({
  origin: CLIENT_ORIGIN
}))

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