const express = require('express')
const _ = require('lodash')

const User = require('../models/user')
const Comment = require('../models/comment')

const router = express.Router()

router.route('/')
  .get(async (req, res, next) => {
    try {
      const users = await User.findAll()
      res.json(users)
    } catch (err) {
      console.error(err);
      res.send('등록된 유저가 없습니다.')
      next(err)
    }
  })
  .post(async (req, res, next) => {
    try {
      const user = await User.create({
        name: req.body.name,
        age: req.body.age,
        married: req.body.married,
        created_at: Date()
      })
      res.status(201).json(user)
    } catch (err) {
      console.error(err, req.body)
      next(err)
    }
  })

router.get('/:id/comments', async (req, res, next) => {
  try {
    const comment = await Comment.findAll({
      include: {
        model: User,
        where: {id: req.params.id}
      }
    })
    console.log('comment', comment)
    if (_.isEmpty(comment)) {
      res.send('댓글이 없습니다.')
      next(comment)
    }
    console.log(comment)
    res.json(comment)
  } catch (err) {
    console.log(err)
    next(err)
  }
})

module.exports = router
