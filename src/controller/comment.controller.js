const CommentService = require('../service/comment.service')

class CommentController {

  async createComment (ctx, next) {
    console.log("用户信息", ctx.state.user)
    const params = ctx.request.body
    const { id: userId } = ctx.state.user
    params.userId = userId

    try {
      const res = await CommentService.createComment(params)
      // 3. 返回结果
      ctx.body = {
        code: 0,
        msg: '新建评论成功',
        data: res
      }
    } catch (err) {
      console.error(err)
    }
  }

  async removeComment (ctx, next) {
    const params = ctx.request.body
    try {
      const res = await CommentService.removeComment(params)
      // 3. 返回结果
      ctx.body = {
        code: 0,
        msg: '移除评论成功',
        data: res
      }
    } catch (err) {
      console.error(err)
    }
  }


  async getCommentList (ctx, next) {
    const params = ctx.query
    try {
      const res = await CommentService.getCommentList(params)
      // 3. 返回结果
      ctx.body = {
        code: 0,
        msg: '获取评论列表成功',
        data: res
      }
    } catch (err) {
      console.error(err)
    }
  }

}

module.exports = new CommentController()