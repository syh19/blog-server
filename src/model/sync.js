// require('./article.model')
// require('./user.model')
// require('./category.model')
// require('./comment.model')
// require('./tag.model')

require('./index.model')

const seq = require('../db/seq')

const sync = async () => {
  // await seq.sync({force: true}) // 清空数据库同步
  await seq.sync({ alter: true }) // 只查看修改的地方并进行同步
  console.log("同步完成")
}

sync()