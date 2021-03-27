const xss = require('xss')

const PostsService = {
  getAllPosts(db) {
    return db
      .from('ridespot_posts AS post')
      .select(
        'post.post_id',
        'post.sport',
        'post.title',
        'post.spot_description',
        'post.spot_address',
        'post.difficulty',
        'post.security_level',
        'post.img',
        'post.modified',
        'post.user_id',
      )
  },
  getByUser(db, user_id) {
    return PostsService.getAllPosts(db)
      .from('ridespot_posts As post')
      .select('*')
      .where('post.user_id', user_id)
  },
  insertPost(db, newPost) {
    return db
      .insert(newPost)
      .into('ridespot_posts')
      .returning('*')
      .then(([post]) => post)
  },
  deletePost(knex, id) {
    return knex('ridespot_posts')
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