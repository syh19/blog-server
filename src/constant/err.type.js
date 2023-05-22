module.exports = {
  /** 输入的用户信息格式错误 */
  userFormatError: {
    code: 10001,
    msg: '用户名或密码为空',
    data: null
  },
  /** 用户已存在 */
  userAlreadyExists: {
    code: 10002,
    msg: '用户已经存在',
    data: null
  },
  /** 用户注册错误 */
  userRegisterError: {
    code: 10003,
    msg: '用户注册错误',
    data: null
  },
  /** 用户不存在 */
  userDoesNotExist: {
    code: 10004,
    msg: '用户不存在',
    data: null
  },
  userLoginError: {
    code: 10005,
    msg: '用户登录失败',
    data: null
  },
  invalidPassword: {
    code: 10006,
    msg: '密码不匹配',
    data: null
  },
  tokenExpiredError: {
    code: 10101,
    msg: 'token已过期',
    data: null
  },
  invalidToken: {
    code: 10102,
    msg: '无效的token',
    data: null
  },
  hasNotAdminPermission: {
    code: 10103,
    msg: '没有管理员权限',
    data: null
  },
  unSupportedFileType: {
    code: 10202,
    msg: '不支持的文件格式',
    data: null
  },
  fileUploadError: {
    code: 10203,
    msg: '文件上传出错',
    data: null
  },
  inputFormatError: {
    code: 10301,
    msg: '输入格式错误',
    data: null
  }
}