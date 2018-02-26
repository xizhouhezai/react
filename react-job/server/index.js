const express = require('express')
const app = new express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const server = require('http').Server(app)

const io = require('socket.io')(server)

const userRouter = require('./router/user')
const chatRouter = require('./router/chat')

io.on('connection', (socket) => {
  console.log('链接成功!!!!')
  socket.on('sendMsg', (data) => {
    console.log(data)
    io.emit('rescMsg', data)
  })
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)
app.use('/chat', chatRouter)

server.listen(8888, () => {
  console.log("server run at localhost:8888")
})