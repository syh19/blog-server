const { DataTypes } = require('sequelize')
const moment = require("moment")

const seq = require('../db/seq')


// 创建模型（Model user -> users）
const User = seq.define('user',
  {
    nickName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
      comment: '用户昵称'
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "用户头像"
    },
    account: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: "用户的账户名，系统唯一"
    },
    password: {
      type: DataTypes.CHAR(64),
      allowNull: false,
      comment: '密码'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '用户邮箱'
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '用户的个人主页'
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: '是否为管理员；0表示是管理员，1表示非管理员（默认）'
    }
  },
  {
    //   timestamps: false
    paranoid: true,  // 是否生成删除的时间戳
  }
)

// 通过执行这个文件手动创建该数据表，平时这句话需要注释掉
// User.sync({ force: true })

module.exports = User