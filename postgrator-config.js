require('dotenv').config()
const pg = require('pg');

module.exports = {    
    CLIENT_ORIGIN : process.env.CLIENT_ORIGIN || 'http://localhost:3000',
    "migrationsDirectory": "migrations",
    "driver": "pg",
    "connectionString": (process.env.NODE_ENV === 'test')
    ? process.env.TEST_DATABASE_URL
    : process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
      }
}