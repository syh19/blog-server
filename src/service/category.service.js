const Category = require('../model/category.model')
class CategoryService {

  async createCategory (params) {
    const { name, parentId } = params

    const res = await Category.create({
      name,
      parentId
    })
    return res.dataValues
  }

  async removeCategory (params) {
    const { id } = params
    const res = await Category.destroy({
      where: {
        id
      }
    })
    return res[0] > 0 ? false : true
  }

  async updateCategory (params) {
    const { id, name } = params
    const res = await Category.update({ name }, {
      where: {
        id
      }
    })
    return res[0] > 0
  }

  async getCategoryList (params) {
    const { id } = params
    const whereOpt = {}
    id && Object.assign(whereOpt, { parentId: id })
    const res = await Category.findAll({
      attributes: ['id', 'name'],
      where: whereOpt
    })
    return res
  }
}

module.exports = new CategoryService()