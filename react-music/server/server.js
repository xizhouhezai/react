const Koa = require('koa')
const Cors = require('koa2-cors')
const bodyparser = require('koa-bodyparser')
const app = new Koa()

const router = require('./router')

app.use(Cors())
app.use(bodyparser())

app.use(router.routes())

app.listen(9000, () => {
  console.log('server run at 9000')
})
