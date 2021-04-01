const knex = require('knex')
const bcrypt = require('bcryptjs')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Users Endpoints', function () {
  let db

  const { testTeachers } = helpers.makePostsFixtures()
  const testUser = testTeachers[0]

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

  describe(`POST /api/users`, () => {
    context(`Happy path given teacher`, () => {
      it(`responds 201, serialized user, storing bcryped password`, () => {
        const newUser = {
          username: 'test user_name',
          password: '11AAaa!!',
          full_name: 'test full_name',
          userType: 'teacher'
        }
        return supertest(app)
          .post('/api/users')
          .send(newUser)
          .expect(201)
      })
    })
    context(`Happy path given student`, () => {
      it(`responds 201, serialized user, storing bcryped password`, () => {
        const newUser = {
          username: 'test user_name',
          password: '11AAaa!!',
          full_name: 'test full_name',
          userType: 'student'
        }
        return supertest(app)
          .post('/api/users')
          .send(newUser)
          .expect(201)
      })
    })
  })
  
})