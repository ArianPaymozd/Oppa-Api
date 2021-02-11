const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('posts Endpoints', function() {
  let db

  const {
    testUsers,
    testPosts,
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

  describe(`GET /api/posts`, () => {
    context(`Given no posts`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/posts')
          .expect(200, [])
      })
    })

    context('Given there are posts in the database', () => {
      beforeEach('insert posts', () =>
        helpers.seedPostsTables(
          db,
          testUsers,
          testPosts,
        )
      )

      it('responds with 200 and all of the posts', () => {
        const expectedPosts = testPosts.map(post =>
          helpers.makeExpectedPost(
            post
          )
        )
        return supertest(app)
          .get('/api/posts')
          .expect(200, expectedPosts)
      })
    })
  })
  describe(`DELETE /api/posts/:post_id`, () => {
    context('Given there are posts in the database', () => {
      beforeEach('insert posts', () =>
        helpers.seedPostsTables(
          db,
          testUsers,
          testPosts,
        )
      )

      it('responds with 204', () => {
        return supertest(app)
          .delete('/api/posts/1')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(204)
      })
    })
  })
})