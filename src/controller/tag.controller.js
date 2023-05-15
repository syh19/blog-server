const TagService = require('../service/tag.service')

class TagController {

  /**
   * 注册接口
   */
  async createTag (ctx, next) {
    const params = ctx.request.body

    try {
      const res = await TagService.createTag(params)
      // 3. 返回结果
      ctx.body = {
        code: 0,
        msg: '新建标签成功',
        data: res
      }
    } catch (err) {
      console.error(err)
    }
  }

  async removeTag (ctx, next) {
    const params = ctx.request.body
    try {
      const res = await TagService.removeTag(params)
      // 3. 返回结果
      ctx.body = {
        code: 0,
        msg: '移除标签成功',
        data: res
      }
    } catch (err) {
      console.error(err)
    }
  }

  async updateTag (ctx, next) {
    const params = ctx.request.body
    try {
      const res = await TagService.updateTag(params)
      // 3. 返回结果
      ctx.body = {
        code: 0,
        msg: '更新标签成功',
        data: res
      }
    } catch (err) {
      console.error(err)
    }
  }

  
  async getTagList (ctx, next) {
    const params = ctx.query
    try {
      const res = await TagService.getTagList()
      // 3. 返回结果
      ctx.body = {
        code: 0,
        msg: '获取标签列表成功',
        data: res
      }
    } catch (err) {
      console.error(err)
    }
  }

}

module.exports = new TagController()