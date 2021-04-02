const express = require('express')
const path = require('path')
const AuthService = require('../auth/auth-service')
const { requireAuthTeacher } = require('../middleware/jwt-auth')
const UsersService = require('./users-service')

const usersRouter = express.Router()
const jsonBodyParser = express.json()

usersRouter
  .post('/', jsonBodyParser, (req, res, next) => {
    const { full_name, username, password, userType } = req.body

    for (const field of ['password', 'username']) {
      if (!req.body[field]) {
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        })
      }
    }

    if (username.startsWith(' ') || username.endsWith(' ')) {
      return res.status(400).json({
        error: `Username can't start or end with spaces`
      })
    }
    UsersService.usernameExists(req.app.get('db'), username)
    .then(user => {
      if (user) {
        return res.status(400).json({
          error: `Username already exists`
        })
      }
    }).catch(next)


    const passwordError = UsersService.validatePassword(password)

    if (passwordError) {
      return res.status(400).json({
        error: passwordError
      })
    }

    function insertUser(newUser) {
      if (userType === 'teacher') {
        return UsersService.insertTeacher(
          req.app.get('db'),
          newUser
        )
      } else {
          return UsersService.insertStudent(
            req.app.get('db'),
            newUser
          )
        }
    }

    UsersService.hashPassword(password)
          .then(hashedPassword => {
            const newUser = {
              password: hashedPassword,
              full_name,
              username,
              date_created: 'now()'
            }
              insertUser(newUser)
              .then(user => {
                res
                  .status(201)
                  .json(UsersService.serializeUser(user))
              }).catch(next)
          }).catch(next)
  })

module.exports = usersRouter