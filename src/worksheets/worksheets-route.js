const express = require('express')
const path = require('path')
const WorksheetsService = require('./worksheets-service')
const { requireAuth } = require('../middleware/jwt-auth')
const { json } = require('express')

const postsRouter = express.Router()
const jsonBodyParser = express.json()

postsRouter
  .route('/')
  // .get((req, res, next) => {
  //   WorksheetsService.getAllPosts(req.app.get('db'))
  //     .then(posts => {
  //       res.json(posts)
  //     })
  //     .catch(next)
  // })
  .post(requireAuth, jsonBodyParser, async (req, res, next) => {
    const { worksheet_name, class_id, animation_scroll, animation_questions, reading } = req.body
    const newWorksheet = { worksheet_name, class_id, animation_scroll, animation_questions, reading }

    for (const [key, value] of Object.entries(newWorksheet)) {
      if (value == null) {
        return res.status(400).json({ error: `Missing '${key}' in request body` })
      }
    }
    const updateClass =  await WorksheetsService.getClassById(req.app.get('db'), class_id)

    const newClass = {
      class_id: updateClass[0].class_id,
      class_name: updateClass[0].class_name,
      class_password: updateClass[0].class_password,
      students: updateClass[0].students,
      worksheets: (updateClass[0].worksheets + 1),
      modified: updateClass[0].modified,
      teacher_id: updateClass[0].teacher_id,
    }

    await WorksheetsService.updateWorksheetCount(
        req.app.get('db'),
        newClass,
        class_id
    )
    console.log(newClass, {
      class_id: updateClass[0].class_id,
      class_name: updateClass[0].class_name,
      class_password: updateClass[0].class_password,
      students: updateClass[0].students,
      worksheets: (updateClass[0].worksheets + 1),
      modified: updateClass[0].modified,
      teacher_id: updateClass[0].teacher_id,
    })
    WorksheetsService.insertPost(
      req.app.get('db'),
      newWorksheet
    )
      .then(post => {

        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${post.worksheet_id}`))
          .json(post)
      })

  })

postsRouter
  .route('/:class_id')
  .all(requireAuth)
  .get((req, res, next) => {
    console.log(req.params.class_id)
    WorksheetsService.getByClass(req.app.get('db'), req.params.class_id)
      .then(posts => {
        res.status(200).json(posts)
      })
      .catch(next)
  })

postsRouter
  .route('/:post_id')
  .all(requireAuth)
  .delete((req, res, next) => {
    WorksheetsService.deletePost(
      req.app.get('db'),
      req.params.post_id
    )
      .then(() => {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = postsRouter