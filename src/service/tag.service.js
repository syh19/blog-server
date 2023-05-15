const Tag = require('../model/tag.model')

class TagService {

  async createTag (params) {
    const { name } = params

    const res = await Tag.create({
      name
    })
    return res.dataValues
  }

  async removeTag (params) {
    const { id } = params
    const res = await Tag.destroy({
      where: {
        id
      }
    })
    return res[0] > 0 ? false : true
  }

  async updateTag (params) {
    const { id, name } = params
    const res = await Tag.update({ name }, {
      where: {
        id
      }
    })
    return res[0] > 0
  }

  async getTagList () {
    const res = await Tag.findAll({
      attributes: ['id', 'name']
    })
    return res
  }


}

module.exports = new TagService()