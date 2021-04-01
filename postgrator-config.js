require('dotenv').config()
const pg = require('pg');
pg.defaults.ssl = process.env.NODE_ENV === "production";

module.exports = {
    "migrationsDirectory": "migrations",
    "driver": "pg",
    "username": "username",
    "password": "password",
    "database": "database",
    "host": "host",
    "dialect": "postgres",
    "dialectOptions": {
        "ssl": true
    }
        
}