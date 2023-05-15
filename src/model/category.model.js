const { DataTypes } = require('sequelize')
// const moment = require("moment")

const seq = require('../db/seq')


const Category = seq.define('category',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: '分类名称'
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: false,
      comment: '父级分类ID'
    }
  },
  {
    // timestamps: false,  // 是否生成创建和更新的时间戳
    paranoid: true,  // 是否生成删除的时间戳
    freezeTableName: false,  // 是否固定表名称
    // updatedAt: false  // 不需要更新时间
  }
)

// 通过执行这个文件手动创建该数据表，平时这句话需要注释掉
// Category.sync({ force: true })

module.exports = Category