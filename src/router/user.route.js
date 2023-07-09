const Router = require('koa-router')

const { isUserAlreadyExists, bcryptPassword, verifyLogin } = require('../middleware/user.middleware')
const { isLogin } = require('../middleware/auth.middleware')
const { inputValidator } = require('../middleware/common.middleware')

const { register, loginToGetUserInfo, changePassword, changeInfo } = require('../controller/user.controller')

const router = new Router({ prefix: '/user' })

/** 测试接口 */
router.get('/test', (ctx, next) => {
  ctx.body = {
    code: 0,
    data: '后端接口部署成阿斯顿发功sdfsdfsdfsfdgsfdgfgshdfsgdhgfdv哈dfg哈哈：' + new Date().getTime(),
    msg: '接口部署成功'
  }
})

/** 用户注册 */
router.post('/register', inputValidator({
  nickName: 'string',
  avatar: 'string',
  account: 'string',
  password: {
    type: 'password',
    min: 6,
    max: 16,
    convertType: 'string'
  }, email: {
    required: false,
    type: 'email',
    convertType: 'string'
  }, url: {
    required: false,
    type: 'url',
    convertType: 'string'
  }
}), isUserAlreadyExists, bcryptPassword, register)

/** 登录 */
router.post('/login', inputValidator({
  account: {
    type: 'string',
    required: true
  },
  password: {
    type: 'string',
    required: true
  },
}), verifyLogin, loginToGetUserInfo)

/** 修改用户信息 */
router.patch('/info', inputValidator({
  nickName: {
    type: 'string',
    required: false
  }, avatar: {
    type: 'string',
    required: false
  }, email: {
    type: 'email',
    convertType: 'string'
  }, url: {
    type: 'url',
    convertType: 'string'
  }
}), isLogin, changeInfo)
router.patch('/pwd', inputValidator({
  password: {
    type: 'password',
    min: 6,
    max: 16,
    convertType: 'string'
  }
}), isLogin, changePassword)



module.exports = router