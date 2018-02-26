const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/imooc-chat")
mongoose.connection.on('connected', () => {
  console.log('connect is success!!!')
})

const chat = {
    'chatid': {type: String, require: true},
    'from': {type: String, require: true},
    'to': {type: String, require: true},
    'content': {type: String, require: true, default: ''},
    'read': {type: Boolean, default: false},
    'create_time': {type: Number, default: new Date().getTime()},
  }

const chatModel = mongoose.model('chat', new mongoose.Schema(chat))

module.exports = chatModel