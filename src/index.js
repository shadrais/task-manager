const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()

app.use(express.json())

const port = process.env.PORT || 3000

app.post('/users', async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()
    res.send(201).send(user)
  } catch (error) {
    res.status(400).send(error)
  }
})

app.post('/task', async (req, res) => {
  try {
    const task = new Task(req.body)
    await task.save()
    res.status(201).send(task)
  } catch (error) {
    res.status(400).send(error)
  }
})

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({})
    if (!users) return res.status(404).send()
    res.status(200).send(users)
  } catch (error) {
    res.status(404).send(error)
  }
})

app.get('/users/:id', async (req, res) => {
  try {
    const _id = req.params.id
    const user = await User.findById(_id)

    if (!user) return res.status(404).send()

    res.status(200).send(user)
  } catch (error) {
    res.status(404).send(error)
  }
})

app.get('/task', async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.status(200).send(tasks)
  } catch (error) {
    res.status(404).send(error)
  }
})

app.get('/task/:id', async (req, res) => {
  try {
    const _id = req.params.id
    const task = await Task.findById(_id)
    if (!task) return res.status(404).send()
    res.status(200).send(task)
  } catch (error) {
    res.status(404).send(error)
  }
})

app.listen(port, () => {
  console.log(`Sever running on port ${port}`)
})
