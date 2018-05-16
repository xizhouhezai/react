const Router = require('koa-router')

const Playlist = require('../model/playlist')

const router = new Router()

// 所有歌单分类列表
router.get('/playlist/catlist', Playlist.playlist_catlist)

// 歌单分类列表的详情
router.get('/playlist', Playlist.playlist)

module.exports = router