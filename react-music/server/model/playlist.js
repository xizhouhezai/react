const {
  createWebAPIRequest
} = require('../util/api')

module.exports = {
  // 所有歌单的分类
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
    ctx.body = result.body
    next()
  },
  // 歌单分类列表的详情
  async playlist(ctx, next) {
    const cookie = ctx.cookies.get('Cookie') ? ctx.cookies.get('Cookie') : ''
    // order可为 'hot' 可为 'new'
    const data = {
      cat: ctx.query.cat || '全部',
      order: ctx.query.order || 'hot',
      offset: ctx.query.offset || 0,
      total: ctx.query.total ? 'true' : 'false',
      limit: ctx.query.limit || 50
    }
    const result = await createWebAPIRequest(
      'music.163.com',
      '/weapi/playlist/list',
      'POST',
      data,
      cookie
    )
    ctx.body = result.body
    next()
  },
  // 歌单内的详情
  async detail(ctx, next) {
    const cookie = ctx.cookies.get("Cookie") ? ctx.cookies.get("Cookie") : "";
    const data = {
      id: ctx.query.id,
      n: 100000,
      csrf_token: ""
    }

    const result = await createWebAPIRequest(
      "music.163.com",
      `/api/playlist/detail?id=${ctx.query.id}`,
      "POST",
      data,
      cookie
    )
    ctx.body = result.body
    next()
  },
  // 热门歌单分类
  async hot(ctx, next) {
    const cookie = ctx.cookies.get('Cookie') ? ctx.cookies.get('Cookie') : ''
    const data = {}
    const result = await createWebAPIRequest(
      'music.163.com',
      '/weapi/playlist/hottags',
      'POST',
      data,
      cookie
    )
    ctx.body = result.body
    next()
  }
}