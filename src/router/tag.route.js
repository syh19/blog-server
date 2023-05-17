const Router = require('koa-router')

const { inputValidator } = require('../middleware/common.middleware')

const { createTag, removeTag, updateTag, getTagList } = require('../controller/tag.controller')



const router = new Router({ prefix: '/tag' })

router.post('/create', inputValidator({
  name: {
    type: 'string',
    required: true
  }
}), createTag)

router.delete('/remove', removeTag)

router.post('/update', updateTag)

router.get('/list', getTagList)




module.exports = router