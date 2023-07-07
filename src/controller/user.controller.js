const jwt = require('jsonwebtoken')

const { createUser, getUserInfo, changeInfo, changePassword } = require('../service/user.service')
const { userRegisterError, userLoginError } = require('../constant/err.type')

const { JWT_SECRET } = require('../config/config.default')
class UserController {

  /**
   * 注册接口
   */
  async register (ctx, next) {
    // 1. 获取接口传入的数据
    const params = ctx.request.body

    // 2. 操作数据库
    try {
      const res = await createUser(params)
      // 3. 返回结果
      ctx.body = {
        code: 0,
        msg: '用户注册成功',
        data: res
      }
    } catch (err) {
      console.error(err)
      ctx.app.emit('error', userRegisterError, ctx)
    }
  }

  /**
   * 登录并获取token
   */
  async loginToGetUserInfo (ctx, next) {
    const params = ctx.request.body
    // 1. 获取用户信息（在token的payload中，记录id, account, is_admin）
    try {
      const res = await getUserInfo(params)
      ctx.body = {
        code: 0,
        msg: `欢迎回来，${res?.nickName}`,
        data: {
          uid: res.id,
          // nickName: res.nickName,
          avatar: res.avatar,
          account: res.account,
          // email: res.email,
          url: res.url,
          status: res.status,
          token: jwt.sign(res, JWT_SECRET, {
            expiresIn: '10h'
          })
        }
      }
    } catch (err) {
      console.error('用户登录失败', err)
      return ctx.app.emit('error', userLoginError, ctx)
    }
  }

  async changePassword (ctx, next) {
    const id = ctx.state.user.id
    const password = ctx.request.body.password
    try {
      if (await changePassword({ id, password })) {
        ctx.body = {
          code: 0,
          msg: '修改密码成功',
          data: null
        }
      } else {
        ctx.body = {
          code: 10007,
          msg: '修改密码错误',
          data: null
        }
      }
    } catch (err) {
      console.error('修改密码错误', err)
    }
  }

  async changeInfo (ctx, next) {
    const id = ctx.state.user.id
    const params = ctx.request.body
    try {
      if (await changeInfo({ id, ...params })) {
        ctx.body = {
          code: 0,
          msg: '修改信息成功',
          data: null
        }
      } else {
        ctx.body = {
          code: 10007,
          msg: '修改信息错误',
          data: null
        }
      }
    } catch (err) {
      console.error('修改信息错误', err)
    }
  }
}

module.exports = new UserController()