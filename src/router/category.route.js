const Router = require('koa-router')

const { createCategory, removeCategory, updateCategory, getCategoryList } = require('../controller/category.controller')


const router = new Router({ prefix: '/category' })

router.post('/create', createCategory)

router.delete('/remove', removeCategory)

router.post('/update', updateCategory)

router.get('/list', getCategoryList)




module.exports = router