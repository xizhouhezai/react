var router = require('express').Router()
const path = require('path')
const fs = require('fs')
const util = require('utility')
const userModel = require('../model/user')

const _filter = {pwd: 0, __v: 0}

router.post('/register', (req, res) => {
  console.log(req.body)
  const {user, pwd, type} = req.body
  userModel.findOne({user: user}, (err, doc) => {
    if (doc) {
      return res.json({code: 1, msg: '用户名重复'})
    }
    let newUserModel = new userModel({user, pwd: md5Pwd(pwd), type})
    newUserModel.save((e, d) => {
      if (e) {
        return res.json({code: 1, msg: '服务器出错了'})
      }
      if (d) {
        res.cookie('userid', d._id)
        const { user, type, _id} = d
        return res.json({code: 0, data: { user, type, _id}})
      }
    })
    // userModel.create({user, pwd: md5Pwd(pwd), type}, (e, d) => {
    //   if (e) {
    //     return res.json({code: 1, msg: '服务器出错了'})
    //   }
    //   return res.json({code: 0})
    // })
  })
})
router.post('/login', (req, res) => {
  console.log(req.body)
  const {user, pwd} = req.body
  userModel.findOne({user: user}, (err, doc) => {
    console.log(doc)
    if (!doc) {
      return res.json({code: 1, msg: '该用户不存在，请注册'})
    }
    userModel.findOne({pwd: md5Pwd(pwd), user: user}, _filter, (e, d) => {
      if (e) {
        return res.json({code: 1, msg: '服务器出错了'})
      }
      if (d) {
        res.cookie('userid', d._id)
        return res.json({code: 0, data: d})
      } else {
        return res.json({code: 1, msg: '密码错误！'})
      }
    })
  })
})
router.post('/update', (req, res) => {
  const userid = req.cookies.userid
  if (!userid) {
    res.json({code: 1})
  }
  const body = req.body
  userModel.findByIdAndUpdate(userid, body, (err, doc) => {
    if (err) {
      return res.json({code: 1, msg: '服务器出错了'})
    }
    if (doc) {
      const data = Object.assign({}, {
        user: doc.user,
        type: doc.type
      }, body)
      res.json({code: 0, data})
    }
  })
})
router.get('/list', (req, res) => {
  // userModel.remove({}, function(e,d){})
  userModel.find({}, (err, doc) => {
    res.json(doc)
  })
})
router.get('/info', (req, res) => {
  console.log(req.cookies)
  const { userid } = req.cookies
  if (!userid) {
    res.json({
      code: 1
    })
  }
  userModel.findOne({_id: userid}, _filter, (err, doc) => {
    console.log(doc)
    if (err) {
      return res.json({code: 1, msg: '服务器出错了'})
    }
    if (doc) {
      return res.json({code: 0, data: doc})
    }
  })
})

router.get('/avatar', (req, res) => {
  let result = []
  const publicPath = path.join(__dirname, '../../', '/src/common/images')
  let files = fs.readdirSync(publicPath)
  class Img{
    constructor({imgName, imgPath}) {
      this.imgName = imgName
      this.imgPath = imgPath
    }
  }
  files.forEach((val) => {
    console.log(val)
    result.push(new Img({
      imgName: val.split('.')[0],
      imgPath: val
    }))
  })
  result = JSON.stringify(result)
  res.json(result)
})

function md5Pwd(pwd) {
  const salt = 'kdjfkdjdkfjlmk%?*~782jkm'
  pwd = pwd + salt
  return util.md5(util.md5(pwd))
}

module.exports = router