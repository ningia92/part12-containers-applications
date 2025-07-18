const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();

const redis = require('../redis')

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  let todo_counter = await redis.getAsync('todo_counter')
  await redis.setAsync('todo_counter', parseInt(todo_counter) + 1)

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()

  let todo_counter = await redis.getAsync('todo_counter')
  await redis.setAsync('todo_counter', parseInt(todo_counter) - 1)

  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  await req.todo.updateOne(req.body)
  res.sendStatus(204)
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
