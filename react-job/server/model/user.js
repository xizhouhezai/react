const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/imooc-chat")
mongoose.connection.on('connected', () => {
  console.log('connect is success!!!')
})

const user = {
    'user':{type:String, 'require':true},
		'pwd':{type:String, 'require':true},
		'type':{'type':String, 'require':true},
		//头像
		'avatar':{'type':String},
		// 个人简介或者职位简介
		'desc':{'type':String},
		// 职位名
		'title':{'type':String},
		// 如果你是boss 还有两个字段
		'company':{'type':String},
		'money':{'type':String}
  }

const userModel = mongoose.model('user', new mongoose.Schema(user))

module.exports = userModel

