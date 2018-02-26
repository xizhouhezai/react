var router = require('express').Router()

const chatModel = require('../model/chat')

router.get('/getmsglist', (req, res) => {
  // const user = req.cookies('user')
  chatModel.find({}, (err, doc) => {
    if (!err) {
      res.json({code: 0, data: doc})
    }
  })
})

module.exports = router