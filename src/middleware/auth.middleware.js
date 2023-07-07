const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../config/config.default')
const { tokenExpiredError, invalidToken, hasNotAdminPermission } = require('../constant/err.type')

/** 判断是否登录，即是否获取了登录后的权限，通过有无token判断的 */
const isLogin = async (ctx, next) => {
  const { authorization = '' } = ctx.request.header
  const token = authorization.replace('Bearer ', '')
  // console.log("修改密码成功" + token)
  try {
    // user中包含了payload的信息（id, account, is_admin）
    const user = jwt.verify(token, JWT_SECRET)
    ctx.state.user = user
    // console.log(user)
  } catch (err) {
    switch(err.name) {
      case 'TokenExpiredError':
        console.error('token已经过期', err)
        return ctx.app.emit('error', tokenExpiredError, ctx)
      case 'JsonWebTokenError':
        console.error('无效的token', err)
        return ctx.app.emit('error', invalidToken, ctx)
    }
  }
  await next()
}

/** 判断是否具有管理员权限 */
const hasAdminPermission = async(ctx, next) => {
  const { status } = ctx.state.user

  if(!status) {
    console.error('该用户没有管理员的权限', ctx.state.user)
    return ctx.app.emit('error', hasNotAdminPermission, ctx)
  }

  await next()
}

module.exports = {
  isLogin,
  hasAdminPermission
}