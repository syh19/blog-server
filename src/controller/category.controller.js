const CategoryService = require('../service/category.service')

class CategoryController {

  /**
   * 注册接口
   */
  async createCategory (ctx, next) {
    const params = ctx.request.body

    try {
      const res = await CategoryService.createCategory(params)
      // 3. 返回结果
      ctx.body = {
        code: 0,
        msg: '新建分类成功',
        data: res
      }
    } catch (err) {
      console.error(err)
    }
  }

  async removeCategory (ctx, next) {
    const params = ctx.request.body
    try {
      const res = await CategoryService.removeCategory(params)
      // 3. 返回结果
      ctx.body = {
        code: 0,
        msg: '移除分类成功',
        data: res
      }
    } catch (err) {
      console.error(err)
    }
  }

  async updateCategory (ctx, next) {
    const params = ctx.request.body
    try {
      const res = await CategoryService.updateCategory(params)
      // 3. 返回结果
      ctx.body = {
        code: 0,
        msg: '更新分类成功',
        data: res
      }
    } catch (err) {
      console.error(err)
    }
  }

  async getCategoryList (ctx, next) {
    const params = ctx.query
    try {
      const res = await CategoryService.getCategoryList(params)
      // 3. 返回结果
      ctx.body = {
        code: 0,
        msg: '获取分类列表成功',
        data: res
      }
    } catch (err) {
      console.error(err)
    }
  }

}

module.exports = new CategoryController()