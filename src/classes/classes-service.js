const xss = require('xss')

const PostsService = {
  getAllPosts(db) {
    return db
      .from('oppa_classes')
      .select('*')
  },
  getByUser(db, teacher_id) {
    return PostsService.getAllPosts(db)
      .from('oppa_classes')
      .select('*')
      .where({ teacher_id })
  },
  insertPost(db, newPost) {
    return db
      .insert(newPost)
      .into('oppa_classes')
      .returning('*')
      .then(([post]) => post)
  },
  deletePost(knex, id) {
    return knex('oppa_classes')
      .where('post_id', id)
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