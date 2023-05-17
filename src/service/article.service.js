const { Op } = require('sequelize')

const { Article, Tag } = require('../model/index.model')

class ArticleService {

  /** 添加或者更新文章 */
  async updateArticle (params) {
    const { id, title, content, status, categoryId, tags } = params
    let newArticle = {}
    title && Object.assign(newArticle, { title })
    content && Object.assign(newArticle, { content })
    status && Object.assign(newArticle, { status })
    categoryId && Object.assign(newArticle, { categoryId })
    let article = null
    if (!id) {
      article = await Article.create({
        ...newArticle,
        likeNum: 0,
        readNum: 1
      })
    } else {
      await Article.update(newArticle, {
        where: {
          id
        }
      })
      article = await Article.findByPk(id)
    }
    if (tags) {
      let newTags = await Tag.findAll({ where: { id: tags } })  //找到对应的tagId对象
      await article.addTags(newTags)
    }
    return article.id
  }

  /** 根据ID获取单篇文章 */
  async getArticleContent (params) {
    const { id } = params
    try {
      const res = await Article.findByPk(id)
      return res
    } catch (err) {
      console.error("获取文章失败", err)
    }
  }

  /** 获取所有文章标题 */
  async getAllArticleList (params) {
    const { categoryId, tagId } = params
    const whereOpt = {}
    categoryId && Object.assign(whereOpt, { categoryId })
    // tagId && Object.assign(whereOpt, { id: tagId })

    const res = await Article.findAll({
      attributes: ['id', 'title', 'status', 'likeNum', 'readNum'],
      // include: [{
      //   model: Tag
      // }],
      where: whereOpt
    })
    return res
  }

  /** 获取文章后立即浏览量+1 */
  async increaseArticleReadNum (params) {
    const { id } = params
    const res = await Article.increment({
      readNum: 1
    }, {
      where: {
        id
      }
    })
  }

}

module.exports = new ArticleService()