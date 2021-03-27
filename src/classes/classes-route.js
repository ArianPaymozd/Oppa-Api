const express = require('express')
const path = require('path')
const PostsService = require('./classes-service')
const { requireAuth } = require('../middleware/jwt-auth')
const { json } = require('express')

const classesRouter = express.Router()
const jsonBodyParser = express.json()

classesRouter
  .route('/')
  .get((req, res, next) => {
    PostsService.getAllPosts(req.app.get('db'))
      .then(posts => {
        const postList = posts.map(post => {
          return PostsService.serializePost(post)
        })
        res.json(postList)
      })
      .catch(next)
  })
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { class_name, teacher_id, class_password } = req.body
    const newPost = { 
      class_name,  
      teacher_id,
      students: 0,
      worksheets: 0,
      class_password: class_password ? class_password : null
    }

    for (const [key, value] of Object.entries(newPost)) {
      if (key !== 'class_password' && value == null) {
        return res.status(400).json({ error: `Missing '${key}' in request body` })
      }
    }

    PostsService.insertPost(
      req.app.get('db'),
      newPost
    )
      .then(post => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${post.post_id}`))
          .json(PostsService.serializePost(post))
      })
      .catch(next)
  })

classesRouter
  .route('/:teacher_id')
  .all(requireAuth)
  .get((req, res, next) => {
    console.log(req.params)
    PostsService.getByUser(req.app.get('db'), parseInt(req.params.teacher_id))
      .then(posts => {
        // const postList = posts.map(post => {
        //   return PostsService.serializePost(post)
        // })
        res.status(200).json(posts)
      })
      .catch(next)
  })

classesRouter
  .route('/:post_id')
  .all(requireAuth)
  .delete((req, res, next) => {
    PostsService.deletePost(
      req.app.get('db'),
      req.params.post_id
    )
      .then(() => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = classesRouter