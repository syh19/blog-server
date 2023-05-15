const Router = require('koa-router')

const { createTag, removeTag, updateTag, getTagList } = require('../controller/tag.controller')


const router = new Router({ prefix: '/tag' })

router.post('/create', createTag)

router.delete('/remove', removeTag)

router.post('/update', updateTag)

router.get('/list', getTagList)




module.exports = router