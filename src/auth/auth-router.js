const express = require('express')
const AuthService = require('./auth-service')
const { requireAuthTeacher } = require('../middleware/jwt-auth')

const authRouter = express.Router()
const jsonBodyParser = express.json()

authRouter
  .post('/login', jsonBodyParser, (req, res, next) => {
    const { username, password, userType } = req.body
    const loginUser = { username, password, userType }
    for (const [key, value] of Object.entries(loginUser))
      if (value == null)
        return res.status(401).json({
          error: `Missing '${key}' in request body`
        })
    function getUser() {
      if (userType === 'teacher') {
        return AuthService.getTeacherWithUserName(
          req.app.get('db'),
          loginUser.username
        )
      } else {
          return AuthService.getStudentWithUserName(
            req.app.get('db'),
            loginUser.username
          )
      }
    }
      getUser()
      .then(dbUser => {
        if (!dbUser)
          return res.status(400).json({
            error: 'Incorrect uxxsername or password',
          })

        return AuthService.comparePasswords(loginUser.password, dbUser.password)
          .then(compareMatch => {
            if (!compareMatch)
              return res.status(400).json({
                error: 'Incorrect username or password',
              })
            const sub = dbUser.username
            const payload = { user_id: dbUser.id }
            res.status(200).json({
              authToken: AuthService.createJwt(sub, payload),
              user_id: dbUser.id
            })
          }).catch(next)
      }).catch(next)
  })


module.exports = authRouter