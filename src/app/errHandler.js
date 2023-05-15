const { logger } = require('../config/koaLog4');


module.exports = (err, ctx) => {
  let status = 200
  switch (err.code) {
    case 10001:
      status = 400
      break
    case 10002:
      // 资源冲突状态码
      status = 409
      break
    default:
      status = 200
  }
  ctx.status = status
  logger.error(err);
  ctx.body = err
  console.log("兜底或者指定的错误信息", err)
}