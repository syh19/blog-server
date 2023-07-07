const Router = require('koa-router')

// 中间件
const { isLogin } = require('../middleware/auth.middleware')
const { inputValidator } = require('../middleware/common.middleware')

// 控制器
const { updateArticle, getArticleContent, getAllArticleList } = require('../controller/article.controller')

const router = new Router({ prefix: '/article' })

/** 添加以及更新文章接口 */
router.post('/update', inputValidator({
  // id: {
  //   type: 'number',
  //   required: false
  // },
  title: {
    type: 'string',
    required: false,
    allowEmpty: true
  },
  content: {
    type: 'string',
    required: false
  }, 
  // status: {
  //   type: 'enum',
  //   // 0 草稿  |  1 公开  | 2 私有  |  3 未知
  //   required: false,
  //   values: [0, 1, 2, 3]
  // }, 
  categoryId: {
    type: 'string',
    required: false,
  }, 
  tags: {
    type: 'array',
    required: false
  }
}), updateArticle)

/** 获取文章列表 */
router.get('/list', getAllArticleList)



/** 获取文章信息 */
router.get('/:id', getArticleContent)


module.exports = router
