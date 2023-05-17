const Comment = require('../model/comment.model')
const User = require('../model/user.model')
const utils = require('../utils/func')
class CommentService {

  async createComment (params) {
    const { content, parentId, replyId, userId, articleId } = params

    const res = await Comment.create({
      content,
      parentId,
      replyId,
      userId,
      articleId
    })
    return res.dataValues
  }

  async removeComment (params) {
    const { id } = params
    const res = await Comment.destroy({
      where: {
        id
      }
    })
    return res[0] > 0 ? false : true
  }


  async getCommentList (params) {
    const { articleId } = params
    const whereOpt = {}
    articleId && Object.assign(whereOpt, { articleId })
    const res = await Comment.findAll({
      where: whereOpt,
      include: {
        model: User,
        as: 'user',
      }
    })

    return utils.commentsListToTree(res)
  }
}

module.exports = new CommentService()