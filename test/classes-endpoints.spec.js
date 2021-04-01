const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('posts Endpoints', function () {
  let db

  const {
    testTeachers,
    testClasses,
    testStudents,
    testStudentClasses,
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

  describe(`GET /api/classes/:teacher_id`, () => {
    context(`Given no posts`, () => {
      beforeEach('insert posts', () =>
      helpers.seedTeachers(
        db,
        testTeachers,
      )
    )
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/classes/1')
          .set('Authorization', helpers.makeAuthHeader(testTeachers[0]))
          .expect(200, [])
      })
    })

    context('Given there are posts in the database', () => {
      beforeEach('insert posts', () =>
        helpers.seedClassesTables(
          db,
          testTeachers,
          testClasses,
        )
      )

      it('responds with 200 and all of the posts', () => {
        const expectedPosts = testClasses.map(post =>
          helpers.makeExpectedClass(
            post
          )
        )
        return supertest(app)
          .get('/api/classes/1')
          .set('Authorization', helpers.makeAuthHeader(testTeachers[0]))
          .expect(200, expectedPosts)
      })
    })
  })
  describe(`GET /api/classes/:student_id`, () => {
    context(`Given no posts`, () => {
      beforeEach('insert posts', () =>
      helpers.seedStudents(
        db,
        testStudents,
      )
    )
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/classes/students/1')
          .set('Authorization', helpers.makeAuthHeader(testStudents[0]))
          .expect(200, [])
      })
    })

    context('Given there are posts in the database', () => {
      beforeEach('insert posts', () =>
        helpers.seedStudentClassesTables(
          db,
          testTeachers,
          testClasses,
          testStudents,
          testStudentClasses,
        )
      )

      it('responds with 200 and all of the posts', () => {
        const expectedPosts = testStudentClasses.map(post =>
          helpers.makeExpectedStudentClass(
            post
          )
        )
        return supertest(app)
          .get('/api/classes/students/1')
          .set('Authorization', helpers.makeAuthHeader(testStudents[0]))
          .expect(200, expectedPosts)
      })
    })
  })
  describe(`POST /api/classes`, () => {
    context(`Happy path`, () => {
      beforeEach('insert posts', () =>
        helpers.seedTeachers(
          db,
          testTeachers,
        )
      )
      it(`responds 201`, () => {
        const newClass = {
          class_name: 'Test',
          class_password: 'password',
          teacher_id: 1
        }
        return supertest(app)
          .post('/api/classes')
          .set('Authorization', helpers.makeAuthHeader(testTeachers[0]))
          .send(newClass)
          .expect(201)
      })
    })
  })
  describe(`DELETE /api/posts/:post_id`, () => {
    context('Given there are posts in the database', () => {
      beforeEach('insert posts', () =>
        helpers.seedClassesTables(
          db,
          testTeachers,
          testClasses,
        )
      )

      it('responds with 204', () => {
        return supertest(app)
          .delete('/api/classes/1')
          .set('Authorization', helpers.makeAuthHeader(testTeachers[0]))
          .expect(204)
      })
    })
  })
})