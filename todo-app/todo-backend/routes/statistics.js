const express = require('express')
const router = express.Router()

const redis = require('../redis')

router.get('/', async (req, res) => {
  let todo_counter = await redis.getAsync('todo_counter')

  res.send({
    added_todos: parseInt(todo_counter) || 0
  })
})

module.exports = router