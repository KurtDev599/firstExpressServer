const express = require('express')
const _ = require('lodash')

const User = require('../models/user')
const Comment = require('../models/comment')

const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    const comment = await Comment.create({
      userId: req.body.userId,
      comment: req.body.comment
    })
    console.log(comment)
    res.status(201).json(comment)
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.route('/:id')
  .put(async (req, res, next) => {
    try {
      const result = await Comment.update({
        comment: req.body.comment
      }, {
        where: {id: req.params.id}
      })
      res.json(result)
    } catch (err) {
      console.error(err)
      next(err)
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await Comment.destroy({
          where: {id: req.params.id}
      })
      console.log('result',result)
      console.log('params', req.params)
      res.json(result)
    } catch (err) {
      console.log(err)
      next(err)
    }
  })

module.exports = router
