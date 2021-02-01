const express = require('express')
const path = require('path')
const PostsService = require('./posts-service')
const { requireAuth } = require('../middleware/jwt-auth')
const { json } = require('express')

const postsRouter = express.Router()
const jsonBodyParser = express.json()

postsRouter
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
    const { title, spot_description, spot_address, difficulty, security_level, img, sport, user_id } = req.body
    const newPost = { title, spot_description, spot_address, difficulty, security_level, img, sport, user_id }

    for (const [key, value] of Object.entries(newPost)) {
        if (value == null) {
            return res.status(400).json({error: `Missing '${key}' in request body`})
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

postsRouter
.route('/:user_id')
.all(requireAuth)
.get((req, res, next) => {
    PostsService.getByUser(req.app.get('db'), req.params.user_id)
    .then(posts => {
        const postList = posts.map(post => {
            return PostsService.serializePost(post)
        })
        res.json(postList)
    })
    .catch(next)
})

module.exports = postsRouter