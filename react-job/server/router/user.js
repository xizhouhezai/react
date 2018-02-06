var router = require('express').Router()
const util = require('utility')
const userModel = require('../model/user')

router.post('/register', (req, res) => {
  console.log(req.body)
  const {user, pwd, type} = req.body
  userModel.findOne({user: user}, (err, doc) => {
    if (doc) {
      return res.json({code: 1, msg: '用户名重复'})
    }
    userModel.create({user, pwd: md5Pwd(pwd), type}, (e, d) => {
      if (e) {
        return res.json({code: 1, msg: '服务器出错了'})
      }
      return res.json({code: 0})
    })
  })
})
router.post('/login', (req, res) => {
  const {user, pwd} = req.body
  userModel.findOne({user: user}, (err, doc) => {
    if (!doc) {
      return res.json({code: 1, msg: '该用户不存在，请注册'})
    }
    userModel.findOne({pwd: md5Pwd(pwd)}, (e, d) => {
      if (e) {
        return res.json({code: 1, msg: '服务器出错了'})
      }
      if (d) {
        return res.json({code: 0, data: d})
      } else {
        return res.json({code: 1, msg: '密码错误！'})
      }
    })
  })
})
router.get('/list', (req, res) => {
  // userModel.remove({}, function(e,d){})
  userModel.find({}, (err, doc) => {
    res.json(doc)
  })
})
router.get('/info', (req, res) => {
  res.json({
    code: 0
  })
})

function md5Pwd(pwd) {
  const salt = 'kdjfkdjdkfjlmk%?*~782jkm'
  pwd = pwd + salt
  return util.md5(util.md5(pwd))
}

module.exports = router