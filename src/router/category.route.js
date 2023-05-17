const Router = require('koa-router')

const { inputValidator } = require('../middleware/common.middleware')

const { createCategory, removeCategory, updateCategory, getCategoryList } = require('../controller/category.controller')


const router = new Router({ prefix: '/category' })

/** 创建分类 */
router.post('/create', inputValidator({
  name: 'string',
  parentId: {
    type: 'number',
    required: false
  }
}), createCategory)

router.delete('/remove', removeCategory)

router.post('/update', updateCategory)

router.get('/list', inputValidator({
  id: {
    type: 'string',
    required: false,
    allowEmpty: true,
  }
}), getCategoryList)




module.exports = router