const knex = require('knex')
const jwt = require('jsonwebtoken')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Auth Endpoints', function () {
  let db

  const { testTeachers, testStudents } = helpers.makePostsFixtures()
  const testTeacher = testTeachers[0]
  const testStudent = testStudents[0]

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`POST /api/auth/login`, () => {
    context(`Given Teacher`, () => {
      beforeEach('insert users', () =>
        helpers.seedTeachers(
          db,
          testTeachers,
        )
      )

      it(`responds 200 and JWT auth token using secret when valid credentials`, () => {
        const userValidCreds = {
          username: testTeacher.username,
          password: testTeacher.password,
          userType: 'teacher'
        }
        const expectedToken = jwt.sign(
          { user_id: testTeacher.id },
          process.env.JWT_SECRET,
          {
            subject: testTeacher.username,
            expiresIn: '3h',
            algorithm: 'HS256',
          }
        )
        return supertest(app)
          .post('/api/auth/login')
          .send(userValidCreds)
          .expect(200, {
            authToken: expectedToken,
            user_id: testTeacher.id
          })
      })
    })
  })
  context(`Given Student`, () => {
    beforeEach('insert users', () =>
      helpers.seedStudents(
        db,
        testStudents,
      )
    )

    it(`responds 200 and JWT auth token using secret when valid credentials`, () => {
      const userValidCreds = {
        username: testStudent.username,
        password: testStudent.password,
        userType: 'student'
      }
      const expectedToken = jwt.sign(
        { user_id: testStudent.id },
        process.env.JWT_SECRET,
        {
          subject: testStudent.username,
          expiresIn: '3h',
          algorithm: 'HS256',
        }
      )
      return supertest(app)
        .post('/api/auth/login')
        .send(userValidCreds)
        .expect(200, {
          authToken: expectedToken,
          user_id: testStudent.id
        })
    })
  })
})