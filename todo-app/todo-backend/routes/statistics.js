const express = require('express')
const router = express.Router()

const redis = require('../redis')

router.get('/', async (req, res) => {
  let todo_counter = await redis.getAsync('todo_counter')

  if (!todo_counter) await redis.setAsync('todo_counter', 0)

  res.send({
    added_todos: parseInt(todo_counter)
  })
})

module.exports = router