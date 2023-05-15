const { DataTypes } = require('sequelize')
const moment = require('moment')

const seq = require('../db/seq')


const Tag = seq.define('tag',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: '标签名称'
    }
  },
  {
    // timestamps: false,  // 是否生成创建和更新的时间戳
    paranoid: true,  // 是否生成删除的时间戳
    freezeTableName: false  // 是否固定表名称
  }
)

// 通过执行这个文件手动创建该数据表，平时这句话需要注释掉
// Article.sync({ force: true })


module.exports = Tag