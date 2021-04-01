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
    testWorksheets
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

  describe(`GET /api/worksheets/:class_id`, () => {
    context(`Given no worksheets`, () => {
      beforeEach('insert posts', () =>
      helpers.seedTeachers(
        db,
        testTeachers,
      )
    )
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/worksheets/1')
          .set('Authorization', helpers.makeAuthHeader(testTeachers[0]))
          .expect(200, [])
      })
    })

    context('Given there are posts in the database', () => {
      beforeEach('insert posts', () =>
        helpers.seedWorksheetTables(
          db,
          testTeachers,
          testStudents,
          testClasses,
          testWorksheets
        )
      )

      it('responds with 200 and all of the posts', () => {
        const expectedPosts = testWorksheets.map(post =>
          helpers.makeExpectedWorksheet(
            post
          )
        )
        return supertest(app)
          .get('/api/worksheets/1')
          .set('Authorization', helpers.makeAuthHeader(testTeachers[0]))
          .expect(200, expectedPosts)
      })
    })
  })
  describe(`GET /api/worksheets/students/:class_id`, () => {
    context(`Given no worksheets`, () => {
      beforeEach('insert posts', () =>
      helpers.seedStudents(
        db,
        testStudents,
      )
    )
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/worksheets/students/1')
          .set('Authorization', helpers.makeAuthHeader(testStudents[0]))
          .expect(200, [])
      })
    })

    context('Given there are posts in the database', () => {
      beforeEach('insert posts', () =>
        helpers.seedWorksheetTables(
          db,
          testTeachers,
          testStudents,
          testClasses,
          testWorksheets
        )
      )

      it('responds with 200 and all of the posts', () => {
        const expectedPosts = testWorksheets.map(post =>
          helpers.makeExpectedWorksheet(
            post
          )
        )
        return supertest(app)
          .get('/api/worksheets/students/1')
          .set('Authorization', helpers.makeAuthHeader(testStudents[0]))
          .expect(200, expectedPosts)
      })
    })
  })
  describe(`POST /api/classes`, () => {
    context(`Happy path`, () => {
      beforeEach('insert posts', () =>
        helpers.seedWorksheetTables(
          db,
          testTeachers,
          testStudents,
          testClasses,
          testWorksheets
        )
      )
      it(`responds 201`, async () => {
        const newWorksheet = {
          class_id: 1,
          reading: 'ds fsdf sdf sdfd fsd fds',
          animation_scroll: 'bubble',
          worksheet_name: 'new sheet'
        }
        return supertest(app)
          .post('/api/worksheets')
          .set('Authorization', helpers.makeAuthHeader(testTeachers[0]))
          .send(newWorksheet)
          .expect(201)
      })
    })
  })
})