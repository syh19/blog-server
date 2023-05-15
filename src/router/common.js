const Router = require('koa-router')

const { uploadFile } = require('../middleware/alioss.middleware')

const router = new Router({ prefix: '/common' })

/** 文件上传接口 */
router.post('/uploadFile', uploadFile)

module.exports = router
