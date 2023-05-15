
const { inputFormatError } = require('../constant/err.type')

/** 校验接口传入的参数格式是否正确 */
const inputValidator = (rules) => {
  return async (ctx, next) => {
    try {
      ctx.verifyParams(rules)
    } catch (err) {
      console.error(err)
      inputFormatError.data = err
      return ctx.app.emit('error', inputFormatError, ctx)
    }
  
    await next()
  }
}

module.exports = {
  inputValidator
}