const path = require('path')

const { inputFormatError } = require('../constant/err.type')
const { updateArticle, getArticleContent, increaseArticleReadNum, getAllArticleList } = require('../service/article.service')


class ArticleController {

  /** 创建或者更新文章 */
  async updateArticle (ctx, next) {
    try {
      const params = ctx.request.body
      console.log(ctx.request.body)
      const res = await updateArticle(params)
      ctx.body = {
        code: 0,
        msg: '添加或者更新文章成功',
        data: res
      }
    } catch (err) {
      console.log(err)
    }
    await next()
  }

  /** 获取指定文章的内容 */
  async getArticleContent (ctx, next) {
    try {
      const params = ctx.request.params
      const res = await getArticleContent(params)
      await increaseArticleReadNum(params)
      ctx.body = {
        code: 0,
        msg: '获取文章成功',
        data: res
      }

    } catch (err) {
      console.error(err)
    }
  }

  /** 获取所有文章列表标题 */
  async getAllArticleList (ctx, next) {
    const params = ctx.query
    try {
      const res = await getAllArticleList(params)
      ctx.body = {
        code: 0,
        msg: '获取文章列表成功',
        data: res
      }
    } catch (err) {
      console.error(err)
    }
  }
}




module.exports = new ArticleController()