const {
  createWebAPIRequest
} = require('../util/api')

module.exports = {
  async playlist_catlist (ctx, next) {
    const cookie = ctx.cookies.get('Cookie') ? ctx.cookies.get('Cookie') : ''
    const data = {
      csrf_token: ''
    }
    const result = await createWebAPIRequest(
      'music.163.com',
      '/weapi/playlist/catalogue',
      'POST',
      data,
      cookie
    )
    ctx.body = result
    next()
  }
}