const bcrypt = require('bcryptjs')

const { getUserInfo } = require('../service/user.service')
const { userAlreadyExists, userRegisterError, userDoesNotExist, userLoginError, invalidPassword } = require('../constant/err.type')

/**
 * 校验用户是否已经存在
 */
const isUserAlreadyExists = async (ctx, next) => {
  const { account } = ctx.request.body

  // 涉及到数据库操作的，一定要用try-catch进行包裹，以便统一捕获异常错误
  try {
    const res = await getUserInfo({ account })
    if (res) {
      console.error('用户名已存在', { account })
      ctx.app.emit('error', userAlreadyExists, ctx)
      return
    }
  } catch (err) {
    console.error('获取用户信息错误', err)
    ctx.app.emit('error', userRegisterError, ctx)
    return
  }
  await next()
}

/**
 * 对密码进行加盐加密
 */
const bcryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body

  const salt = bcrypt.genSaltSync(10)
  /** hash保存的是密文 */
  const hash = bcrypt.hashSync(password, salt)
  ctx.request.body.password = hash

  await next()
}

/**
 * 校验用户名和密码是否正确
 */
const verifyLogin = async (ctx, next) => {
  const { account, password } = ctx.request.body
  try {
    const res = await getUserInfo({ account })
    if (!res) {
      console.error('用户名不存在', { account })
      ctx.app.emit('error', userDoesNotExist, ctx)
      return
    }
    if (!bcrypt.compareSync(password, res.password)) {
      ctx.app.emit('error', invalidPassword, ctx)
      return
    }
  } catch (err) {
    console.error(err)
    return ctx.app.emit('error', userLoginError, ctx)
  }


  await next()
}






module.exports = {
  isUserAlreadyExists,
  bcryptPassword,
  verifyLogin
}