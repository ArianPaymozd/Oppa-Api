const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeTeachersArray() {
  return [
    {
      id: 1,
      username: 'test-teacher-1',
      full_name: 'Test teacher 1',
      email: 'TU1',
      password: 'password',
      classes: 0,
      students: 0,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 2,
      username: 'test-teacher-2',
      full_name: 'Test teacher 2',
      email: 'TU2',
      password: 'password',
      classes: 0,
      students: 0,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 3,
      username: 'test-teacher-3',
      full_name: 'Test teacher 3',
      email: 'TU3',
      password: 'password',
      classes: 0,
      students: 0,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 4,
      username: 'test-teacher-4',
      full_name: 'Test teacher 4',
      email: 'TU4',
      password: 'password',
      classes: 0,
      students: 0,
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
  ]
}

function makeClassesArray() {
  return [
    {
      modified: '2029-01-22T16:28:32.615Z',
      class_id: 1,
      class_name: 'Bio',
      class_password: 'password',
      students: 0,
      worksheets: 0,
      teacher_id: 1
    },
    {
      modified: '2029-01-22T16:28:32.615Z',
      class_id: 2,
      class_name: 'Math',
      class_password: 'password',
      students: 0,
      worksheets: 0,
      teacher_id: 1
    },
    {
      modified: '2029-01-22T16:28:32.615Z',
      class_id: 3,
      class_name: 'English',
      class_password: 'password',
      students: 0,
      worksheets: 0,
      teacher_id: 1
    },
    {
      modified: '2029-01-22T16:28:32.615Z',
      class_id: 4,
      class_name: 'Physics',
      class_password: 'password',
      students: 0,
      worksheets: 0,
      teacher_id: 1
    },
  ]
}

function makeStudentsArray() {
  return [
    {
      id: 1,
      username: 'test-student-1',
      full_name: 'Test student 1',
      email: 'TU1',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 2,
      username: 'test-student-2',
      full_name: 'Test student 2',
      email: 'TU2',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 3,
      username: 'test-student-3',
      full_name: 'Test student 3',
      email: 'TU3',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 4,
      username: 'test-student-4',
      full_name: 'Test student 4',
      email: 'TU4',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
  ]
}

function makeClassesArray() {
  return [
    {
      modified: '2029-01-22T16:28:32.615Z',
      class_id: 1,
      class_name: 'Bio',
      class_password: 'password',
      students: 0,
      worksheets: 0,
      teacher_id: 1
    },
    {
      modified: '2029-01-22T16:28:32.615Z',
      class_id: 2,
      class_name: 'Math',
      class_password: 'password',
      students: 0,
      worksheets: 0,
      teacher_id: 1
    },
    {
      modified: '2029-01-22T16:28:32.615Z',
      class_id: 3,
      class_name: 'English',
      class_password: 'password',
      students: 0,
      worksheets: 0,
      teacher_id: 1
    },
    {
      modified: '2029-01-22T16:28:32.615Z',
      class_id: 4,
      class_name: 'Physics',
      class_password: 'password',
      students: 0,
      worksheets: 0,
      teacher_id: 1
    },
  ]
}

function makeStudentClassesArray() {
  return [
    {
      id: 1,
      class_id: 1,
      class_name: 'Bio',
      class_password: 'password',
      student_id: 1
    },
    {
      id: 2,
      class_id: 2,
      class_name: 'Math',
      class_password: 'password',
      student_id: 1
    },
    {
      id: 3,
      class_id: 1,
      class_name: 'English',
      class_password: 'password',
      student_id: 1
    },
    {
      id: 4,
      class_id: 1,
      class_name: 'Physics',
      class_password: 'password',
      student_id: 1
    },
  ]
}

function makeWorksheetsArray() {
  return [
    {
      worksheet_id: 1,
      class_id: 1,
      reading: 'jaksd h asj dhjkdh d hkd askjd akjsd kjasd j dk h',
      animation_scroll: 'bubble',
      worksheet_name: 'test-worksheet',   
    },
    {
      worksheet_id: 2,
      class_id: 1,
      reading: 'jaksd h asj dhjkdh d hkd askjd akjsd kjasd j dk h',
      animation_scroll: 'bubble',
      worksheet_name: 'test-worksheet',      
    },
    {
      worksheet_id: 3,
      class_id: 1,
      reading: 'jaksd h asj dhjkdh d hkd askjd akjsd kjasd j dk h',
      animation_scroll: 'bubble',
      worksheet_name: 'test-worksheet',
    },
    {
      worksheet_id: 4,
      class_id: 1,
      reading: 'jaksd h asj dhjkdh d hkd askjd akjsd kjasd j dk h',
      animation_scroll: 'bubble',
      worksheet_name: 'test-worksheet',     
    },
  ]
}

function makeExpectedClass(course) {
  return {
    modified: course.modified,
    class_id: course.class_id,
    class_name: course.class_name,
    class_password: course.class_password,
    students: course.students,
    worksheets: course.worksheets,
    teacher_id: course.teacher_id
  }
}

function makeExpectedWorksheet(worksheet) {
  return {
    worksheet_id: worksheet.worksheet_id,
    class_id: worksheet.class_id,
    reading: worksheet.reading,
    animation_scroll: worksheet.animation_scroll,
    worksheet_name: worksheet.worksheet_name, 
  }
}

function makeExpectedStudentClass(course) {
  return {
    id: course.id,
    class_id: course.class_id,
    class_name: course.class_name,
    class_password: course.class_password,
    student_id: course.student_id
  }
}

function makePostsFixtures() {
  const testTeachers = makeTeachersArray()
  const testStudents = makeStudentsArray()
  const testClasses = makeClassesArray()
  const testStudentClasses = makeStudentClassesArray()
  const testWorksheets = makeWorksheetsArray()
  return { testTeachers, testClasses, testStudents, testStudentClasses, testWorksheets }
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        oppa_teachers,
        oppa_classes,
        oppa_students,
        oppa_worksheets,
        student_classes
      `
    )
  )
}

function seedTeachers(db, teachers) {
  const preppedTeachers = teachers.map(teacher => ({
    ...teacher,
    password: bcrypt.hashSync(teacher.password, 1)
  }))
  return db.into('oppa_teachers').insert(preppedTeachers)
    .then(() =>
      db.raw(
        `SELECT setval('oppa_teachers_id_seq', ?)`,
        [teachers[teachers.length - 1].id],
      )
    )
}

function seedStudents(db, students) {
  const preppedStudents = students.map(student => ({
    ...student,
    password: bcrypt.hashSync(student.password, 1)
  }))
  return db.into('oppa_students').insert(preppedStudents)
    .then(() =>
      db.raw(
        `SELECT setval('oppa_students_id_seq', ?)`,
        [students[students.length - 1].id],
      )
    )
}

function seedClassesTables(db, teachers, posts) {
  return db.transaction(async trx => {
    await seedTeachers(trx, teachers)
    await trx.into('oppa_classes').insert(posts)
  })
}

function seedStudentClassesTables(db, teachers, teacherPosts, students, posts) {
  return db.transaction(async trx => {
    await seedTeachers(trx, teachers)
    await trx.into('oppa_classes').insert(teacherPosts)
    await seedStudents(trx, students)
    await trx.into('student_classes').insert(posts)
  })
}

function seedWorksheetTables(db, teachers, students, posts, worksheets) {
  return db.transaction(async trx => {
    await seedClassesTables(trx, teachers, posts)
    await seedStudents(trx, students)
    await trx.into('oppa_worksheets').insert(worksheets)
  })
}

function makeAuthHeader(teacher, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ teacher_id: teacher.id }, secret, {
    subject: teacher.username,
    algorithm: 'HS256',
  })
  return `Bearer ${token}`
}

module.exports = {
  makeTeachersArray,
  makeClassesArray,
  makeExpectedClass,
  makePostsFixtures,
  cleanTables,
  seedClassesTables,
  makeAuthHeader,
  seedTeachers,
  seedStudents,
  seedStudentClassesTables,
  makeExpectedStudentClass,
  makeWorksheetsArray,
  seedWorksheetTables,
  makeExpectedWorksheet
}