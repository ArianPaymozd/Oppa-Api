const bcrypt = require('bcryptjs')
const xss = require('xss')

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/

const UsersService = {
  getAllUsers(db) {
    return db('oppa_teachers')
      .select('*')
      .from('oppa_teachers')
  },
  getByUser(db, id) {
    return UsersService.getAllUsers(db)
      .from('oppa_teachers AS user')
      .where('user.id', id)
      .first()
  },
  usernameExists(db, username) {
    return db
      .from('oppa_teachers')
      .select('*')
      .where({ username })
      .first()
  },
  getByClass(db, class_id) {
    return db
      .from('oppa_worksheets')
      .select('*')
      .where({ class_id })
  },
  insertTeacher(db, newUser) {
    return db
      .insert(newUser)
      .into('oppa_teachers')
      .returning('*')
      .then(([user]) => user)
  },
  insertStudent(db, newUser) {
    return db
      .insert(newUser)
      .into('oppa_students')
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
      date_created: new Date(user.date_created),
    }
  }
}

module.exports = UsersService