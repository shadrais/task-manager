const express = require('express')
const Task = require('../models/task')

const router = express.Router()

router.post('/task', async (req, res) => {
  try {
    const task = new Task(req.body)
    await task.save()
    res.status(201).send(task)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/task', async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.status(200).send(tasks)
  } catch (error) {
    res.status(404).send(error)
  }
})

router.delete('/task/:id', async (req, res) => {
  try {
    const _id = req.params.id
    const task = await Task.findByIdAndDelete(_id)
    if (!task) return res.status(400).send()
    res.status(200).send(task)
  } catch (error) {
    res.status(400).send()
  }
})

router.get('/task/:id', async (req, res) => {
  try {
    const _id = req.params.id
    const task = await Task.findById(_id)
    if (!task) return res.status(404).send()
    res.status(200).send(task)
  } catch (error) {
    res.status(404).send(error)
  }
})

router.patch('/task/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const validators = ['description', 'completed']
  const check = updates.every((update) => validators.includes(update))
  if (!check) return res.status(404).send('Invalid Request')
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!task) return res.status(404).send()
    res.status(200).send(task)
  } catch (error) {
    res.status(404).send(error)
  }
})

module.exports = router
