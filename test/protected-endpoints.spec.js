const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Protected endpoints', function () {
  let db

  const {
    testTeachers,
    testClasses,
  } = helpers.makePostsFixtures()

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

  beforeEach('insert classes', () =>
    helpers.seedClassesTables(
      db,
      testTeachers,
      testClasses,
    )
  )

  const protectedEndpoints = [
    {
      name: 'GET /api/classes/:teacher_id',
      path: '/api/classes/1',
      method: supertest(app).get,
    },
    {
      name: 'GET /api/classes/students/:student_id',
      path: '/api/classes/students/1',
      method: supertest(app).get,
    },
    {
      name: 'post /api/classes/students',
      path: '/api/classes/students',
      method: supertest(app).post,
    },
    {
      name: 'post /api/classes',
      path: '/api/classes',
      method: supertest(app).post,
    },
    {
      name: 'GET /api/worksheets/:class_id',
      path: '/api/worksheets/1',
      method: supertest(app).get,
    },
    {
      name: 'GET /api/worksheets/students/:class_id',
      path: '/api/worksheets/students/1',
      method: supertest(app).get,
    },
    {
      name: 'post /api/classes',
      path: '/api/worksheets',
      method: supertest(app).post,
    },
    // {
    //   name: 'DELETE /api/classes/:post_id',
    //   path: '/api/classes/1',
    //   method: supertest(app).delete,
    // },
  ]

  protectedEndpoints.forEach(endpoint => {
    describe(endpoint.name, () => {
      it(`responds 401 'Missing bearer token' when no bearer token`, () => {
        return endpoint.method(endpoint.path)
          .expect(401, { error: `Missing bearer token` })
      })

      it(`responds 401 'Unauthorized request' when invalid JWT secret`, () => {
        const validUser = testTeachers[0]
        const invalidSecret = 'bad-secret'
        return endpoint.method(endpoint.path)
          .set('Authorization', helpers.makeAuthHeader(validUser, invalidSecret))
          .expect(401, { error: `Unauthorized request` })
      })

      it(`responds 401 'Unauthorized request' when invalid sub in payload`, () => {
        const invalidUser = { username: 'user-not-existy', id: 1 }
        return endpoint.method(endpoint.path)
          .set('Authorization', helpers.makeAuthHeader(invalidUser))
          .expect(401, { error: `Unauthorized request` })
      })
    })
  })
})