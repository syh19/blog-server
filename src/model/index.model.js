const Article = require('./article.model')
const User = require('./user.model')
const Category = require('./category.model')
const Comment = require('./comment.model')
const Tag = require('./tag.model')

// 处理数据库中表的关系


// 一个用户可以有多条评论
User.hasMany(Comment, {
  foreignKey: {
    name: 'userId',
    allowNull: false
  }
})
Comment.belongsTo(User)

// 一篇文章可以有多条评论
Article.hasMany(Comment, {
  foreignKey: {
    name: "articleId",
    allowNull: true
  }
})
Comment.belongsTo(Article)

// 一个分类中可以有多篇文章
Category.hasMany(Article)
Article.belongsTo(Category)

// 文章与标签之间是多对多的关系
Article.belongsToMany(Tag, {
  through: 'articleTags'
})
Tag.belongsToMany(Article, {
  through: 'articleTags'
})



module.exports = {
  Article,
  User,
  Category,
  Comment,
  Tag
}