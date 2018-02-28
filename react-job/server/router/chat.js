var router = require('express').Router()

const chatModel = require('../model/chat')
const userModel = require('../model/user')
// chatModel.remove({}, (err, doc) => {})

router.get('/getmsglist', (req, res) => {
  const user = req.cookies.userid
  userModel.find({}, (err, userDoc) => {
    let Users = {}
    userDoc.forEach(v => {
      Users[v._id] = {name: v.user, avatar: v.avatar}
    })
    chatModel.find({'$or': [{from: user}, {to: user}]}, (err, doc) => {
      if (!err) {
        res.json({code: 0, data: doc, users: Users})
      }
    })
  })
})

module.exports = router