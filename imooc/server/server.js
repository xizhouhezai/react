var express = require('express')
var mongoose = require('mongoose')

var app = new express()

mongoose.connect('mongodb://127.0.0.1:27017/dumall')

mongoose.connection.on('connected', () => {
  console.log('connect is success!!!')
})

var Schema = mongoose.Schema;
const users = mongoose.model('user', new Schema({
  "userId": String,
  "userName": String,
  "userPwd": Number,
  "orderList": Array,
  "carList": Array,
  "addressList": Array
}))

app.get('/user', (req, res) => {
  const data = users.find()
  data.exec((err, doc) => {
    if(err){
      res.json({
        status:'1',
        msg:err.message
      });
    }else{
      res.json({
          status:'0',
          msg:'',
          result:{
              count:doc.length,
              list:doc
          }
        })
      }
  })
})

app.listen(8888, () => {
  console.log('server run at 8888')
})

