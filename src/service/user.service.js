const User = require('../model/user.model')
class UserService {
  /**
   * 在数据库中新建一个用户
   * @param {string} account 用户名
   * @param {string} password 密码
   * @returns 创建的用户信息
   */
  async createUser (params) {
    const { nickName, avatar, account, password, email, url } = params


    const res = await User.create({
      nickName,
      avatar,
      account,
      password,
      email,
      url,
      status: 1  // 新注册的用户均为普通用户，不得自行设置为管理员
    })
    return res.dataValues
  }

  /**
   * 根据条件查询用户
   * @param {object} params 查询条件
   * @returns 查询到的用户
   */
  async getUserInfo (params) {
    const { account } = params
    console.log("入参", params)
    const whereOpt = {}

    account && Object.assign(whereOpt, { account })

    const res = await User.findOne({
      attributes: ['id', 'nickName', 'account', 'password', 'status'],
      where: whereOpt
    })
    // console.log("我是返回的信息", res.dataValues)
    return res ? res.dataValues : null
  }

  /** 修改用户信息 */
  async changeInfo ({ id, nickName, avatar, email, url }) {
    const whereOpt = { id }
    const newUser = {}

    nickName && Object.assign(newUser, { nickName })
    avatar && Object.assign(newUser, { avatar })
    email && Object.assign(newUser, { email })
    url && Object.assign(newUser, { url })
    const res = await User.update(newUser, {
      where: whereOpt
    })
    return res[0] > 0 ? true : false
  }

  /** 修改用户密码 */
  async changePassword({ id, password }) {
    const whereOpt = { id }
    const newUser = {}

    password && Object.assign(newUser, { password })
    console.log(newUser)
    const res = await User.update(newUser, {
      where: whereOpt
    })
    return res[0] > 0 ? true : false
  }

}

module.exports = new UserService()