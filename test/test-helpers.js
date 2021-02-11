const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'test-user-1',
      full_name: 'Test user 1',
      email: 'TU1',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 2,
      user_name: 'test-user-2',
      full_name: 'Test user 2',
      email: 'TU2',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 3,
      user_name: 'test-user-3',
      full_name: 'Test user 3',
      email: 'TU3',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 4,
      user_name: 'test-user-4',
      full_name: 'Test user 4',
      email: 'TU4',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
  ]
}

function makePostsArray(users) {
  return [
    {
      post_id: 1,
      title: 'First test post!',
      sport: 'How-to',
      user_id: users[0].id,
      modified: '2029-01-22T16:28:32.615Z',
      spot_description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      img: "test-img",
      spot_address: "28694 murrelet dr",
      security_level: "none",
      difficulty: "beginer",
    },
    {
      post_id: 2,
      title: 'Second test post!',
      sport: 'Interview',
      user_id: users[1].id,
      modified: '2029-01-22T16:28:32.615Z',
      spot_description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      img: "test-img",
      spot_address: "28694 murrelet dr",
      security_level: "none",
      difficulty: "beginer",
    },
    {
      post_id: 3,
      title: 'Third test post!',
      sport: 'News',
      user_id: users[2].id,
      modified: '2029-01-22T16:28:32.615Z',
      spot_description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      img: "test-img",
      spot_address: "28694 murrelet dr",
      security_level: "none",
      difficulty: "beginer",
    },
    {
      post_id: 4,
      title: 'Fourth test post!',
      sport: 'Listicle',
      user_id: users[3].id,
      modified: '2029-01-22T16:28:32.615Z',
      spot_description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
      img: "test-img",
      spot_address: "28694 murrelet dr",
      security_level: "none",
      difficulty: "beginer",
    },
  ]
}

function makeExpectedPost(post) {
  return {
    post_id: post.post_id,
    sport: post.sport,
    title: post.title,
    spot_description: post.spot_description,
    difficulty: post.difficulty,
    img: post.img,
    spot_address: post.spot_address,
    security_level: post.security_level,
    user_id: post.user_id,
    modified: post.modified
  }
}

function makePostsFixtures() {
  const testUsers = makeUsersArray()
  const testPosts = makePostsArray(testUsers)
  return { testUsers, testPosts }
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        ridespot_posts,
        ridespot_users
      `
    )
  )
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.into('ridespot_users').insert(preppedUsers)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(
        `SELECT setval('ridespot_users_id_seq', ?)`,
        [users[users.length - 1].id],
      )
    )
}

function seedPostsTables(db, users, posts) {
  // use a transaction to group the queries and auto rollback on any failure
  return db.transaction(async trx => {
    await seedUsers(trx, users)
    await trx.into('ridespot_posts').insert(posts)
  })
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: 'HS256',
  })
  return `Bearer ${token}`
}

module.exports = {
  makeUsersArray,
  makePostsArray,
  makeExpectedPost,

  makePostsFixtures,
  cleanTables,
  seedPostsTables,
  makeAuthHeader,
  seedUsers,
}