const xss = require('xss')

const PostsService = {
  getAllPosts(db) {
    return db
      .from('oppa_classes')
      .select('*')
  },
  getByTeacher(db, teacher_id) {
    return db
      .from('oppa_classes')
      .select('*')
      .where({ teacher_id })
  },
  async getById(db, class_id) {
    return db
      .from('oppa_classes')
      .select('*')
      .where({ class_id })
      .first()
  },
  getByStudent(db, student_id) {
    return db
      .from('student_classes')
      .select('*')
      .where({ student_id })
  },
  insertPost(db, newPost) {
    return db
      .insert(newPost)
      .into('oppa_classes')
      .returning('*')
      .then(([post]) => post)
  },
  async updateStudentCount(db, newClass, class_id) {
    return db
      .from('oppa_classes As course')
      .update(newClass)
      .where({class_id})
  },
  insertStudentClass(db, newPost) {
    return db
      .insert(newPost)
      .into('student_classes')
      .returning('*')
      .then(([post]) => post)
  },
  deletePost(db, class_id) {
    return db
      .from('oppa_classes')
      .where({class_id})
      .delete()
  },
  serializePost(post) {
    return {
      post_id: post.post_id,
      sport: post.sport,
      title: xss(post.title),
      spot_description: xss(post.spot_description),
      spot_address: xss(post.spot_address),
      difficulty: post.difficulty,
      security_level: post.security_level,
      img: xss(post.img),
      modified: new Date(post.modified),
      user_id: post.user_id,
    }
  },
}

module.exports = PostsService