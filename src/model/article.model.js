const { DataTypes } = require('sequelize')
const moment = require('moment')

const seq = require('../db/seq')


const Article = seq.define('article',
  {
    // userId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   comment: '作者用户ID'
    // },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '无标题',
      comment: '文章标题'
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: '文章的内容'
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: "文章状态，默认为草稿"
    },
    likeNum: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '文章点赞数目'
    },
    readNum: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: '文章的阅读次数'
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
// Article.sync({ force: true })


module.exports = Article