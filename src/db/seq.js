const { Sequelize } = require('sequelize')

const { mysql } = require('../utils/encrypt')

const seq = new Sequelize(mysql.DB, mysql.USER, mysql.PWD, {
  host: mysql.HOST,
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