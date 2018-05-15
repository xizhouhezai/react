const Router = require('koa-router')

const playlist = require('../model/playlist')

const router = new Router()

router.get('/playlist/catlist', playlist.playlist_catlist)

module.exports = router