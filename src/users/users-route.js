const express = require('express')
const path = require('path')
const AuthService = require('../auth/auth-service')
const { requireAuth } = require('../middleware/jwt-auth')
const UsersService = require('./users-service')

const usersRouter = express.Router()
const jsonBodyParser = express.json()

usersRouter
  .post('/', jsonBodyParser, (req, res, next) => {
    const { full_name, username, password } = req.body

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
    })


    const passwordError = UsersService.validatePassword(password)

    if (passwordError) {
      return res.status(400).json({
        error: passwordError
      })
    }

    UsersService.hashPassword(password)
          .then(hashedPassword => {
            const newUser = {
              password: hashedPassword,
              full_name,
              username,
              date_created: 'now()'
            }
            return UsersService.insertUser(
              req.app.get('db'),
              newUser
            )
              .then(user => {
                res
                  .status(201)
                  .location(path.posix.join(req.originalUrl, `/${user.id}`))
                  .json(UsersService.serializeUser(user))
              })
              .catch(next)
          })
  })
usersRouter
  .route('/:user_id')
  .all(requireAuth)
  .get((req, res, next) => {
    UsersService.getByUser(req.app.get('db'), req.params.user_id)
      .then(users => res.json(users))
      .catch(next)
  })

module.exports = usersRouter