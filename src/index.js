require('./db/mongoose')
const express = require('express')
const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Sever running on port ${port}`)
})
