const fs = require('fs')

const Router = require('koa-router')
const router = new Router()

// 自动注册路由，不再需要手动导入
fs.readdirSync(__dirname).forEach(file => {
  if(file !== 'index.js') {
    let r = require('./' + file)
    router.use(r.routes())
  }
})

module.exports = router