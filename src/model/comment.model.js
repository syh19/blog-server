const { DataTypes } = require('sequelize')
const moment = require('moment')

const seq = require('../db/seq')


const Comment = seq.define('comment',
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: '评论的内容'
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '评论的父级评论ID，0表示是顶层评论'
    },
    replyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '被回复的评论ID，0表示是顶层评论'
    }
    // createdAt: {
    //   type: DataTypes.DATE,
    //   get () {
    //     return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss')
    //   }
    // },
    // updatedAt: {
    //   type: DataTypes.DATE,
    //   get () {
    //     return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss')
    //   }
    // }
  },
  {
    // timestamps: false,  // 是否生成创建和更新的时间戳
    paranoid: true,  // 是否生成删除的时间戳
    freezeTableName: false  // 是否固定表名称
  }
)

// 通过执行这个文件手动创建该数据表，平时这句话需要注释掉
// Comment.sync({ force: true })


// 2023-05-09 19:07:43

module.exports = Comment