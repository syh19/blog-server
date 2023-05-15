const Router = require('koa-router')

const { createComment, removeComment, getCommentList } = require('../controller/comment.controller')
const { isLogin } = require('../middleware/auth.middleware')


const router = new Router({ prefix: '/comment' })

router.post('/create', isLogin, createComment)

router.delete('/remove', removeComment)

router.get('/list', getCommentList)




module.exports = router