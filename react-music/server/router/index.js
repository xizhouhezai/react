const Router = require('koa-router')

const Playlist = require('../model/playlist')
const Song = require('../model/song')
const Artist = require('../model/artist')

const router = new Router()

// 所有歌单分类列表
router.get('/playlist/catlist', Playlist.playlist_catlist)

// 歌单分类列表的详情
router.get('/playlist', Playlist.playlist)

// 歌单内的详情
router.get('/playlist/detail', Playlist.detail)

// 热门歌单分类
router.get('/playlist/hot', Playlist.hot)

// 获取音乐详情
router.get('/song/detail', Song.detail)

// 获取音乐 url
router.get('/song/musicurl', Song.musicUrl)

router.get('/artist/huaban', Artist.huaban)

module.exports = router