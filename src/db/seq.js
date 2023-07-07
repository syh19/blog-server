const { Sequelize } = require('sequelize')

const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PWD, MYSQL_DB } = require('../config/config.default')

const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  dialect: 'mysql',
  timezone: '+08:00'
})

// 测试数据库是否连接成功
// seq.authenticate().then(() => {
//   console.log("数据库连接成功")
// }).catch((err) => {
//   console.log("数据库连接失败", err)
// })

module.exports = seq