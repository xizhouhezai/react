const {
  createWebAPIRequest
} = require('../util/api')

module.exports = {
  async detail(ctx, next) {
    const cookie = ctx.cookies.get('Cookie') ? ctx.cookies.get('Cookie') : ''
    const id = parseInt(ctx.query.ids)
    const data = {
      // "id": id,
      c: JSON.stringify([{
        id: id
      }]),
      ids: '[' + id + ']',
      csrf_token: ''
    }
    const result = await createWebAPIRequest(
      'music.163.com',
      '/weapi/v3/song/detail',
      'POST',
      data,
      cookie
    )
    ctx.body = result.body
    next()
  },
  // 获取音乐 url
  async musicUrl(ctx, next) {
    const cookie = ctx.cookies.get('Cookie') ? ctx.cookies.get('Cookie') : ''
    const id = ctx.query.id
    const br = ctx.query.br || 999000
    const data = {
      ids: [id],
      br: br,
      csrf_token: ''
    }
    const result = await createWebAPIRequest(
     'music.163.com',
     '/weapi/song/enhance/player/url',
     'POST',
     data,
     cookie,
    )
    ctx.body = result.body
    next()
  }
}