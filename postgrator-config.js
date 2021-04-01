require('dotenv').config()

module.exports = {
    "migrationsDirectory": "migrations",
    "driver": "pg",
    "username": process.env.DATABASE_USER,
    "password":  process.env.DATABASE_PASSWORD,
    "database":  process.env.DATABASE_NAME,
    "host":  process.env.DATABASE_HOST,
    "dialect": "postgres",
    "dialectOptions": {
    "ssl": true
    }
}