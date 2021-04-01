const xss = require('xss')

const WorksheetsService = {
  // getAllPosts(db) {
  //   return db
  //     .from('ridespot_posts AS post')
  //     .select(
  //       'post.post_id',
  //       'post.sport',
  //       'post.title',
  //       'post.spot_description',
  //       'post.spot_address',
  //       'post.difficulty',
  //       'post.security_level',
  //       'post.img',
  //       'post.modified',
  //       'post.user_id',
  //     )
  // },
  getByClass(db, class_id) {
    return db
      .from('oppa_worksheets')
      .select('*')
      .where({ class_id })
  },
  
  async updateWorksheetCount(db, newClass, class_id) {
    return db
      .from('oppa_classes As course')
      .update(newClass)
      .where({class_id})
  },

  getClassById(db, class_id) {
    return db
      .from('oppa_classes')
      .select('*')
      .where({ class_id })
  },

  insertPost(db, newPost) {
    return db
      .insert(newPost)
      .into('oppa_worksheets')
      .returning('*')
      .then(([post]) => post)
  },
}

module.exports = WorksheetsService