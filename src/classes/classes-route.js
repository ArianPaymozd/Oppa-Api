const express = require('express')
const path = require('path')
const PostsService = require('./classes-service')
const { requireAuthTeacher, requireAuthStudent } = require('../middleware/jwt-auth')
const { json } = require('express')

const classesRouter = express.Router()
const jsonBodyParser = express.json()

classesRouter
  .route('/')
  .post(requireAuthTeacher, jsonBodyParser, (req, res, next) => {
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
  .get(requireAuthTeacher, (req, res, next) => {
    PostsService.getByTeacher(req.app.get('db'), parseInt(req.params.teacher_id))
      .then(posts => {
        // const postList = posts.map(post => {
        //   return PostsService.serializePost(post)
        // })
        res.status(200).json(posts)
      })
      .catch(next)
  })

classesRouter
  .route('/students/:id')
  .get(requireAuthStudent, (req, res, next) => {
    PostsService.getByStudent(req.app.get('db'), parseInt(req.params.id))
      .then(posts => {
        // const postList = posts.map(post => {
        //   return PostsService.serializePost(post)
        // })
        res.status(200).json(posts)
      })
      .catch(next)
  })

classesRouter
  .route('/students')
  .post(requireAuthStudent, jsonBodyParser, async (req, res, next) => {
    try {
    const { class_id, student_id, class_password } = req.body
    let newPost = { 
      class_id,  
      student_id,
      class_password: class_password ? class_password : null,
      class_name: ''
    }

    for (const [key, value] of Object.entries(newPost)) {
      if (key !== 'class_password' && value == null) {
        return res.status(400).json({ error: `Missing '${key}' in request body` })
      }
    }

    let result = await PostsService.getById(
      req.app.get('db'),
      class_id
    )
      if (!result) {
        res.status(400).json({ error: 'Incorrect class id' })
      }
      if (result.class_password !== class_password) {
        res.status(400).json({ error: 'incorrect password'})
      }

      newPost.class_name = result.class_name
      
      result = {
          class_name: result.class_name,
          class_id: result.class_id,
          class_password: result.class_password,
          students: result.students + 1,
          worksheets: result.worksheets,
          modified: result.modified,
          teacher_id: result.teacher_id
        }

      await PostsService.updateStudentCount(
        req.app.get('db'),
        result,
        class_id
      )

    PostsService.insertStudentClass(
      req.app.get('db'),
      newPost
    )
      .then(post => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${post.post_id}`))
          .end()
      })
      .catch(next)
    } catch (error) {
      next(error)
    }
  })

classesRouter
  .route('/:class_id')
  .delete((req, res, next) => {
    PostsService.deletePost(
      req.app.get('db'),
      req.params.class_id
    )
      .then(() => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = classesRouter