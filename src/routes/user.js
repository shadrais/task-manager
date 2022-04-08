const express = require('express')
const User = require('../models/user')

const router = new express.Router()

router.post('/users', async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()
    res.send(201).send(user)
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({})
    if (!users) return res.status(404).send()
    res.status(200).send(users)
  } catch (error) {
    res.status(404).send(error)
  }
})

router.get('/users/:id', async (req, res) => {
  try {
    const _id = req.params.id
    const user = await User.findById(_id)

    if (!user) return res.status(404).send()

    res.status(200).send(user)
  } catch (error) {
    res.status(404).send(error)
  }
})

router.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const validators = ['name', 'age', 'email', 'password']
  const check = updates.every((update) => validators.includes(update))
  if (!check) return res.status(404).send('Invalid Request')
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!user) return res.status(404).send()
    res.status(200).send(user)
  } catch (error) {
    res.status(404).send(error)
  }
})

router.delete('/users/:id', async (req, res) => {
  try {
    const _id = req.params.id
    const user = await User.findByIdAndDelete(_id)
    if (!user) return res.status(400).send()
    res.status(200).send(user)
  } catch (error) {
    res.status(400).send()
  }
})

module.exports = router
