const express = require('express')
const app = new express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const userRouter = require('./router/user')

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)

app.listen(8888, () => {
  console.log("server run at localhost:8888")
})