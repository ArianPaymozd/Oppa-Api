const bcrypt = require('bcryptjs')
const xss = require('xss')

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/

const UsersService = {
    getAllUsers(db) {
        return db('ridespot_users')
        .select('*')
        .from('ridespot_users')
    },
    getByUser(db, user_id) {
        return UsersService.getAllUsers(db)
        .from('ridespot_users AS user')
        .where('user.id', user_id)
        .first()
    },
    usernameExists(db, user_name) {
        return db('ridespot_users')
        .where({ user_name })
        .first()
        .then(user => !!user)
    },
    insertUser(db, newUser) {
        return db
        .insert(newUser)
        .into('ridespot_users')
        .returning('*')
        .then(([user]) => user)
    },
    validatePassword(password) {
        if (password.length < 8) {
            return `Password must be longet than 8 characters`
        }
        if (password.startsWith(' ') || password.endsWith(' ')) {
            return `Password can't start or end with spaces`
        }
        if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
            return `Password must contain one upper case, lower case, number and special character`
        }
        return null
    },
    hashPassword(password) {
        return bcrypt.hash(password, 12)
    },
    serializeUser(user) {
        return {
            id: user.id,
            full_name: xss(user.full_name),
            user_name: xss(user.user_name),
            email: xss(user.email),
            date_created: new Date(user.date_created),
        }
    }
}

module.exports = UsersService